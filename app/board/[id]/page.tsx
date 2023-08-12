"use client";

import { Board } from "@/types/board";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Detail from "./Detail";
import Update from "./Update";

const getBoard = async (id: string) => {
    const data = await fetch(`http://localhost:3000/api/board/${id}`);
    const board = await data.json();
    return board;
};

export default function Board({ params: { id } }: { params: { id: string } }) {
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const { data, isSuccess, refetch } = useQuery<{ board: Board }, Error>({
        queryKey: ["detail-board", id],
        queryFn: () => getBoard(id),
    });
    useEffect(() => {
        if (!isUpdate) {
            refetch();
        }
    }, [isUpdate]);

    return (
        <section>
            {isSuccess &&
                (isUpdate ? (
                    <Update board={data!.board} setIsUpdate={setIsUpdate} />
                ) : (
                    <Detail board={data!.board} setIsUpdate={setIsUpdate} />
                ))}
        </section>
    );
}
