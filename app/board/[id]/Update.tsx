"use client";
import { Board } from "@/types/board";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

interface UpdateProps {
    board: Board;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const putBoard = async ({ id, body }: { id: string; body: Board }) => {
    const data = await fetch(`http://localhost:3000/api/board/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...body, updatedAt: Date.now() }),
    });
    const res = await data.json();
    return res;
};

export default function Update({ board, setIsUpdate }: UpdateProps) {
    const [title, setTitle] = useState<string>(board.title);
    const [content, setContent] = useState<string>(board.content);
    const { mutate } = useMutation(putBoard, {
        onSuccess: () => {
            setIsUpdate(false);
        },
    });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (board.title === title && board.content === content) {
            alert("변경된 사항이 없습니다.");
            return;
        }
        mutate({ id: board.id, body: { ...board, title, content } });
    };
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </div>
            <div>
                <div>{board.userId}</div>
                <div>{board.createdAt}</div>
            </div>
            <div>
                <textarea value={content} onChange={(e) => setContent(e.currentTarget.value)} />
            </div>
            <button onClick={() => setIsUpdate(false)}>취소</button>
            <button type="submit">수정</button>
        </form>
    );
}
