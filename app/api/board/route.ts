import { Board } from "@/types/board";
import { NextResponse } from "next/server";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = searchParams.get("page") || 1;
        const res = await fetch(`${BASE_URL}/board?completed=false&page=${page}&limit=15`);
        const boards = (await res.json()) as Board[];

        return NextResponse.json({ boards });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: Request) {
    const data = { content: "test1", title: "test 1", userId: "test", password: "test" };
    const res = await fetch(`${BASE_URL}/board`, {
        method: "POST",
        body: JSON.stringify(data),
    });

    const resData = await res.json();
    return NextResponse.json({ resData });
}
