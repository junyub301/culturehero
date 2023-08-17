"use client";

import Prompt from "@/components/Prompt";
import useModal from "@/lib/useModal";
import useMutations from "@/lib/useMutations";
import { Board } from "@/types/board";
import { dateFormat, encrypt } from "@/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { styled } from "styled-components";
import Comment from "./Comment";
import Link from "next/link";
import useApiError from "@/lib/useApiError";

interface DetailProps {
    board: Board;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Detail({
    board: { title, content, userId, createdAt, id, updatedAt },
    setIsUpdate,
}: DetailProps) {
    const router = useRouter();
    const { handler } = useApiError();
    const { mutate } = useMutations({
        url: `board/${id}`,
        method: "DELETE",
        onSuccessFn: () => router.push("/"),
    });
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

    const checkPassword = useCallback(async (password: string, kind = "update" || "delete") => {
        const res = await fetch(`http://localhost:3000/api/board/${id}/check`, {
            method: "POST",
            body: JSON.stringify({ password: encrypt(password) }),
        });
        if (!res.ok) {
            handler(res.status, res.statusText);
        }
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
    }, []);

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
            <div className="board__back">
                <Link href="/">목록</Link>
            </div>
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
    .board__back {
        margin: 1rem 0;
        text-align: right;
    }
`;
