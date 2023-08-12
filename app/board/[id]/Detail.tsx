"use client";

import { Board } from "@/types/board";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface DetailProps {
    board: Board;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const deleteBoard = async (id: string) => {
    await fetch(`http://localhost:3000/api/board/${id}`, { method: "DELETE" });
};
export default function Detail({
    board: { title, content, userId, createdAt, id },
    setIsUpdate,
}: DetailProps) {
    const router = useRouter();
    const { mutate } = useMutation(deleteBoard, {
        onSuccess: () => {
            router.push("/");
        },
    });
    return (
        <section>
            <div>
                <h1>{title}</h1>
            </div>
            <div>
                <div>{userId}</div>
                <div>{createdAt}</div>
                <button onClick={() => setIsUpdate(true)}>수정</button>
                <button onClick={() => mutate(id)}>삭제</button>
            </div>
            <div>{content}</div>
            <article>
                <input type="text" />
                <button>등록</button>
            </article>
        </section>
    );
}
