import Image from "next/image";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import Boards from "./Boards";

async function getBoards() {
    const data = await fetch("http://localhost:3000/api/board", { cache: "no-store" });
    const boards = await data.json();
    return boards;
}

export default async function Home() {
    const queryClient = getQueryClient();
    await queryClient.prefetchInfiniteQuery(["hydrate-boards"], getBoards);
    const dehydratedState = dehydrate(queryClient);
    return (
        <main>
            <Hydrate state={dehydratedState}>
                <Boards />
            </Hydrate>
        </main>
    );
}
