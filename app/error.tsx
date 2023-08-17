"use client";
import Button from "@/components/Button";
import useModal from "@/lib/useModal";
import Link from "next/link";
import { useEffect } from "react";
import { styled } from "styled-components";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    const { closeModal } = useModal();
    useEffect(() => {
        closeModal();
    }, []);
    return (
        <ErrorWrap>
            <h1>{error.message}</h1>
            <div className="but__area">
                <Button onClick={() => reset()}>재시도</Button>
                <Button>
                    <Link href="/">홈으로</Link>
                </Button>
            </div>
        </ErrorWrap>
    );
}

const ErrorWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .but__area {
        display: flex;
        gap: 5px;
    }
`;
