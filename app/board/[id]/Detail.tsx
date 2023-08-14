"use client";

import { Board } from "@/types/board";
import { dateFormat } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { styled } from "styled-components";
import Comment from "./Comment";

interface DetailProps {
    board: Board;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Detail({
    board: { title, content, userId, createdAt, id, updatedAt },
    setIsUpdate,
}: DetailProps) {
    const router = useRouter();
    const [commentValue, setCommentValue] = useState<string>("");
    const { mutate } = useMutation(
        async (id: string) => {
            await fetch(`http://localhost:3000/api/board/${id}`, { method: "DELETE" });
        },
        {
            onSuccess: () => {
                router.push("/");
            },
        }
    );

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
            <Comment id={id} />
        </Wrap>
    );
}

const Wrap = styled.section`
    padding: 1rem;
    @media screen and (min-width: 600px) {
        padding: 1rem 10rem;
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
`;
