"use client";

import { Board } from "@/types/board";
import { useState } from "react";
import Detail from "./Detail";
import Update from "./Update";
import useFetch from "@/lib/useFetch";

export default function Board({ params: { id } }: { params: { id: string } }) {
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const { data } = useFetch<Board>(`board/${id}`, ["detail-board", id]);
    return (
        <section>
            {data &&
                (isUpdate ? (
                    <Update board={data} setIsUpdate={setIsUpdate} />
                ) : (
                    <Detail board={data} setIsUpdate={setIsUpdate} />
                ))}
        </section>
    );
}
