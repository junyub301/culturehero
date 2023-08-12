"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { Board } from "@/types/board";
import { dateFormat } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { styled } from "styled-components";

interface DetailProps {
    board: Board;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const deleteBoard = async (id: string) => {
    await fetch(`http://localhost:3000/api/board/${id}`, { method: "DELETE" });
};
export default function Detail({
    board: { title, content, userId, createdAt, id, updatedAt },
    setIsUpdate,
}: DetailProps) {
    const router = useRouter();
    const { mutate } = useMutation(deleteBoard, {
        onSuccess: () => {
            router.push("/");
        },
    });
    return (
        <Wrap>
            <div>
                <h1>{title}</h1>
            </div>
            <div>
                <div>
                    <span className="user__id">{userId}</span> •{" "}
                    {dateFormat(updatedAt || createdAt)}
                </div>
                <div className="modify__btn">
                    <button onClick={() => setIsUpdate(true)}>수정</button>
                    <button onClick={() => mutate(id)}>삭제</button>
                </div>
            </div>
            <div className="board__content">{content}</div>
            <article className="board__comment">
                <Input placeholder="댓글을 작성하세요." />
                <Button className="comment__add__btn">등록</Button>
            </article>
        </Wrap>
    );
}

const Wrap = styled.section`
    padding: 1rem 10rem;
    .user__id {
        font-weight: 600;
    }
    .modify__btn {
        text-align: right;
    }
    .board__content {
        margin: 2rem 0px;
    }
    .board__comment {
        text-align: right;
        .comment__add__btn {
            margin-top: 5px;
            width: 5rem;
            padding: 0.5rem;
        }
    }
`;
