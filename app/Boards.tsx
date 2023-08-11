"use client";
import { Board } from "@/types/board";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { styled } from "styled-components";

async function getBoards(page: number) {
    const data = await fetch(`http://localhost:3000/api/board?page=${page}`);
    const boards = await data.json();
    return boards;
}

export default function Boards() {
    const [page, setPage] = useState<number>(1);

    const { data, isSuccess } = useQuery<{ boards: Board[] }, Error>({
        queryKey: ["hydrate-boards", page],
        queryFn: () => getBoards(page),
        keepPreviousData: true,
    });

    return (
        <section>
            <Wrap>
                {isSuccess && data?.boards.length > 0 ? (
                    data?.boards.map((board) => <div key={board.id}>{board.title}</div>)
                ) : (
                    <div>데이터가 없습니다.</div>
                )}
            </Wrap>
            <button onClick={() => setPage((pre) => pre + 1)}>page up</button>
        </section>
    );
}

const Wrap = styled.div`
    /* --space-y: 0;
    --tw-divide-opacity: 1;
    --tw-divide-y-reverse: 0;
    > :not([hidden]) ~ :not([hidden]) {
        margin-top: calc(0.75rem * calc(1 - var(--space-y)));
        margin-bottom: calc(0.75rem * var(--space-y));
        border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
        border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
        border-color: black;
        border-style: solid;
    }
    border: 1px solid black; */
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
    min-height: 400px;
`;
