"use client";

import { Board } from "@/types/board";
import { dateFormat } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import Comment from "./Comment";
import useModal from "@/lib/useModal";
import Prompt from "@/components/Prompt";

interface DetailProps {
    board: Board;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Detail({
    board: { title, content, userId, createdAt, id, updatedAt },
    setIsUpdate,
}: DetailProps) {
    const router = useRouter();
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
        const res = await fetch(`http://localhost:3000/api/board/${id}/check`, {
            method: "POST",
            body: JSON.stringify({ password }),
        });
        const data = await res.json();
        if (data.ok) {
            if (kind === "update") {
                setIsUpdate(true);
            } else {
                mutate(id);
            }
        } else {
            alert("비밀번호가 틀렸습니다.");
        }
    };

    return (
        <Wrap>
            <div>
                <h1>{title}</h1>
            </div>
            <div>
                <div>
                    <span className="user__id">{userId}</span> •{" "}
                    <span className="board__createAt">{dateFormat(updatedAt || createdAt)}</span>
                </div>
                <div className="modify__btn">
                    <button onClick={() => onCheck("update")}>수정</button>
                    <button onClick={() => onCheck("delete")}>삭제</button>
                </div>
            </div>
            <pre className="board__content">{content}</pre>
            <Comment id={id} />
        </Wrap>
    );
}

const Wrap = styled.section`
    padding: 1rem;
    @media screen and (min-width: 600px) {
        padding: 1rem 5rem;
    }
    .user__id {
        font-weight: 500;
    }
    .board__createAt {
        font-size: 14px;
    }
    .modify__btn {
        text-align: right;
    }
    .board__content {
        white-space: pre-wrap;
        margin: 2rem 0px;
    }
`;
