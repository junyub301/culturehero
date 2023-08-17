"use client";
import { CustomError } from "@/lib/expection";
import useIntersection from "@/lib/useIntersection";
import { Board } from "@/types/board";
import { ellipsisStr } from "@/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";

async function getBoards(page: number) {
    const res = await fetch(
        `https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1//board?page=${page}&limit=15&sortby=createdAt&order=desc`
    );

    if (!res.ok) {
        throw new CustomError(res.statusText);
    }
    const boards = await res.json();
    return boards;
}

export default function Boards() {
    const router = useRouter();

    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<Board[], Error>({
        queryKey: ["hydrate-boards"],
        queryFn: ({ pageParam = 1 }) => getBoards(pageParam),
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
            const curPage = allPages.length;
            return lastPage.length >= 15 ? curPage + 1 : undefined;
        },
    });
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, { threshold: 1 });

    useEffect(() => {
        if (!intersection) return;
        if (hasNextPage) {
            if (intersection.isIntersecting) {
                fetchNextPage();
            }
        }
    }, [intersection, hasNextPage]);

    return (
        <div>
            <Wrap>
                {data && data?.pages[0].length > 0 ? (
                    <>
                        {data?.pages?.map((page) =>
                            page?.map((board) => (
                                <Board key={board.id}>
                                    <div className="board__wrap">
                                        <div
                                            className="board__info"
                                            onClick={() => router.push(`/board/${board.id}`)}
                                        >
                                            <h3>{ellipsisStr(board.title, 20)}</h3>
                                            <div className="board__content">
                                                {ellipsisStr(board.content, 50)}
                                            </div>
                                        </div>
                                        <div className="board__userId">
                                            by <span>{board.userId}</span>
                                        </div>
                                    </div>
                                </Board>
                            ))
                        )}
                        <div className="intersection" ref={intersectionRef}></div>
                    </>
                ) : (
                    <div>데이터가 없습니다.</div>
                )}
            </Wrap>
            <Plus href={"/board"}> +</Plus>
        </div>
    );
}

const Wrap = styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    margin-bottom: 1rem;
    background-color: #dfdfdf;
    .intersection {
        height: 100px;
    }
`;

const Plus = styled(Link)`
    border-radius: 100%;
    display: flex;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.5rem;
    position: fixed;
    z-index: 3;
    bottom: 10%;
    right: 5%;
    color: white;
    background-color: #f7b63b;
    &:hover {
        transform: scale(1.15);
        transition: transform 0.5s;
    }
    &:visited {
        color: white;
    }
`;

const Board = styled.article`
    width: 100%;
    z-index: 1;
    padding: 0.5rem;

    .board__wrap {
        border-radius: 10px;
        background-color: white;
    }
    .board__info {
        cursor: pointer;
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
