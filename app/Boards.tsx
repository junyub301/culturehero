"use client";
import { Board } from "@/types/board";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { styled } from "styled-components";

async function getBoards(page: number) {
    const data = await fetch(`http://localhost:3000/api/board?page=${page}`);
    const boards = await data.json();
    return boards;
}

export default function Boards() {
    const [page, setPage] = useState<number>(1);
    const router = useRouter();

    const { data, isSuccess } = useQuery<{ boards: Board[] }, Error>({
        queryKey: ["hydrate-boards", page],
        queryFn: () => getBoards(page),
        keepPreviousData: true,
    });

    return (
        <div>
            <Header>
                <Link href={"/board"}>게시글 추가</Link>
            </Header>
            <Wrap>
                {isSuccess && data?.boards.length > 0 ? (
                    data?.boards.map((board) => (
                        <Board key={board.id} onClick={() => router.push(`/board/${board.id}`)}>
                            <div className="board__wrap">
                                <div className="board__info">
                                    <h3>{board.title}</h3>
                                    <div className="board__content">{board.content}</div>
                                </div>
                                <div className="board__userId">
                                    by <span>{board.userId}</span>
                                </div>
                            </div>
                        </Board>
                    ))
                ) : (
                    <div>데이터가 없습니다.</div>
                )}
            </Wrap>
            <button onClick={() => setPage((pre) => pre + 1)}>page up</button>
        </div>
    );
}

const Wrap = styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    margin-bottom: 1rem;
    flex-wrap: wrap;
    background-color: #dfdfdf;
    @media screen and (min-width: 600px) {
        flex-direction: row;
    }
`;

const Board = styled.article`
    flex-shrink: 1;
    cursor: pointer;
    z-index: 1;
    flex-basis: 100%;
    padding: 0.5rem;
    @media screen and (min-width: 600px) {
        flex-basis: 33%;
        .board__wrap {
            height: 15rem;
        }
    }
    .board__wrap {
        border-radius: 10px;
        background-color: white;
    }
    .board__info {
        padding: 1rem;
        border-bottom: 1px solid gray;
        height: 80%;
    }
    .board__userId {
        padding: 0.5rem 0.5rem 0.5rem 1rem;

        width: 100%;
        font-size: 13px;
        > span {
            font-weight: 600;
        }
    }
`;

const Header = styled.div`
    padding-right: 1rem;
    text-align: right;
`;
