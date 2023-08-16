import Image from "next/image";
import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import Boards from "./Boards";

async function getBoards() {
    try {
        const data = await fetch(
            `https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1//board?page=1&limit=15&sortby=createdAt&order=desc`,
            { cache: "no-store" }
        );
        const boards = await data.json();
        return boards;
    } catch (error) {}
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
