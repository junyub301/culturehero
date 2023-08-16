"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import useMutations from "@/lib/useMutations";
import { Board } from "@/types/board";
import { dateFormat } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { styled } from "styled-components";

interface UpdateProps {
    board: Board;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Update({ board, setIsUpdate }: UpdateProps) {
    const [title, setTitle] = useState<string>(board.title);
    const [content, setContent] = useState<string>(board.content);
    const { mutate } = useMutations({
        url: `board/${board.id}`,
        method: "PUT",
        onSuccessFn: () => setIsUpdate(false),
        invalidateQueryKey: ["detail-board", board.id],
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (board.title === title && board.content === content) {
            alert("변경된 사항이 없습니다.");
            return;
        }
        mutate({ ...board, title, content });
    };

    return (
        <Wrap onSubmit={onSubmit}>
            <div className="update__title">
                <Input autoFocus value={title} onChange={(e) => setTitle(e.currentTarget.value)} />
            </div>
            <div>
                <span className="user__id">{board.userId}</span> •{" "}
                {dateFormat(board.updatedAt || board.createdAt)}
            </div>
            <div className="board__content">
                <Textarea value={content} onChange={(e) => setContent(e.currentTarget.value)} />
            </div>
            <div className="update__footer">
                <Button variants="cancel" onClick={() => setIsUpdate(false)}>
                    취소
                </Button>
                <Button type="submit">수정</Button>
            </div>
        </Wrap>
    );
}

const Wrap = styled.form`
    padding: 1rem 10rem;
    .update__title {
        margin: 1rem 0;
    }
    .user__id {
        font-weight: 600;
    }
    .modify__btn {
        text-align: right;
    }
    .board__content {
        margin: 2rem 0px;
    }
    .update__footer {
        display: flex;
        gap: 2px;
    }
`;
