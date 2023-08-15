"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { dateFormat } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Comment, Comment as CommentType } from "@/types/board";
import { styled } from "styled-components";
import useModal from "@/lib/useModal";
import Prompt from "@/components/Prompt";

interface CreateComment {
    comment: string;
    userId: string;
    password: string;
}

const addComment = async ({ id, body }: { id: string; body: CreateComment }) => {
    await fetch(`http://localhost:3000/api/board/${id}/comment`, {
        method: "POST",
        body: JSON.stringify(body),
    });
};

const getComments = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/board/${id}/comment`);
    const data = await res.json();
    return data;
};

const Comments = ({ id }: { id: string }) => {
    const [commentValue, setCommentValue] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { data, refetch } = useQuery<{ comment: CommentType[] }, Error>({
        queryKey: ["board-comment", id],
        queryFn: () => getComments(id),
    });
    const { mutate: createComment } = useMutation(addComment, {
        onSuccess: () => {
            refetch();
            setCommentValue("");
        },
    });

    const onClick = () => {
        if (userId === "" || password === "" || commentValue === "") {
            alert("아이디/패스워드 및 내용을 입력하세요.");
            return;
        }
        const body = {
            comment: commentValue,
            userId,
            password,
        };
        createComment({ id, body });
        setUserId("");
        setPassword("");
    };

    return (
        <Wrap className="board__comment">
            <div className="comment__input__user">
                <div>
                    <label>
                        ID:{" "}
                        <input value={userId} onChange={(e) => setUserId(e.currentTarget.value)} />{" "}
                    </label>
                    <label>
                        PW:{" "}
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.currentTarget.value)}
                        />
                    </label>
                </div>
            </div>
            <div>
                <Input
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.currentTarget.value)}
                    placeholder="댓글을 작성하세요."
                />
                <Button onClick={onClick} className="comment__add__btn">
                    등록
                </Button>
            </div>
            <div className="comments">
                {data?.comment.map((comment) => {
                    return <Comment key={comment.id} id={id} comment={comment} refetch={refetch} />;
                })}
            </div>
        </Wrap>
    );
};

const deleteComment = async ({ id, commentId }: { id: string; commentId: string }) => {
    await fetch(`http://localhost:3000/api/board/${id}/comment/${commentId}`, { method: "DELETE" });
};

const putComment = async ({
    id,
    commentId,
    body,
}: {
    id: string;
    commentId: string;
    body: any;
}) => {
    await fetch(`http://localhost:3000/api/board/${id}/comment/${commentId}`, {
        method: "PUT",
        body: JSON.stringify({ ...body, updatedAt: new Date() }),
    });
};

const Comment = ({
    id,
    comment,
    refetch,
}: {
    id: string;
    comment: Comment;
    refetch: () => void;
}) => {
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(comment.comment);
    const { mutate: removeComment } = useMutation(deleteComment, {
        onSuccess: () => {
            refetch();
        },
    });

    const { mutate: updateComment } = useMutation(putComment, {
        onSuccess: () => {
            refetch();
            setIsUpdate(false);
        },
    });

    const onUpdate = () => {
        const body = { comment: inputValue };
        updateComment({ id, commentId: comment.id, body });
    };

    const { openModal } = useModal();

    const onCheck = (kind = "update" || "delete") => {
        openModal({
            Component: Prompt,
            props: {
                text: "비밀번호를 입력하세요.",
                onSuccess: (password: string) => checkPassword(password, kind),
            },
        });
    };

    const checkPassword = async (password: string, kind = "update" || "delete") => {
        const res = await fetch(
            `http://localhost:3000/api/board/${id}/comment/${comment.id}/check`,
            {
                method: "POST",
                body: JSON.stringify({ password }),
            }
        );
        const data = await res.json();
        if (data.ok) {
            if (kind === "update") {
                setIsUpdate(true);
            } else {
                removeComment({ id, commentId: comment.id });
            }
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };

    return (
        <div>
            <div className="comment__user__info">
                <div>
                    <span className="comment__userId">{comment.userId} </span>
                    <span className="comment__date">
                        {dateFormat(comment.updatedAt || comment.createdAt)}
                    </span>
                </div>
                <div>
                    {isUpdate ? (
                        <button onClick={() => setIsUpdate(false)}>취소</button>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    onCheck("update");
                                    setInputValue(comment.comment);
                                }}
                            >
                                수정
                            </button>
                            <button onClick={() => onCheck("delete")}>삭제</button>
                        </>
                    )}
                </div>
            </div>
            <div className="comment_content">
                {isUpdate ? (
                    <div className="comment__update">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.currentTarget.value)}
                        />
                        <Button onClick={onUpdate}>수정</Button>
                    </div>
                ) : (
                    comment.comment
                )}
            </div>
        </div>
    );
};

export default Comments;

const Wrap = styled.article`
    text-align: right;
    .comment__add__btn {
        margin-top: 5px;
        width: 5rem;
        padding: 0.5rem;
    }
    .comment__input__user {
        display: flex;
        justify-content: right;
        width: 100%;
        margin-bottom: 5px;
        > div {
            display: flex;
            flex-direction: column;
            gap: 5px;
            font-size: 11px;
            @media screen and (min-width: 600px) {
                flex-direction: row;
            }
        }
    }
    .comments {
        margin-top: 1rem;
        .comment__user__info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .comment__userId {
                font-weight: 600;
            }
            .comment__date {
                font-size: 12px;
            }
        }
        .comment_content {
            padding: 1rem;
            text-align: left;
            .comment__update {
                display: flex;
                gap: 2px;
                > button {
                    width: 25%;
                }
            }
        }
    }
`;
