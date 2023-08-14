import { Board } from "@/types/board";
import { NextResponse } from "next/server";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const res = await fetch(`${BASE_URL}/board/${id}/comment`);
        const comment = (await res.json()) as Board;

        return NextResponse.json({ comment });
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
    const data = await req.json();
    const res = await fetch(`${BASE_URL}/board/${id}/comment`, {
        headers: {
            "Content-Type": `application/json`,
        },
        method: "POST",
        body: JSON.stringify({ ...data, createdAt: new Date(), updatedAt: null }),
    });

    const resData = await res.json();
    return NextResponse.json({ resData });
}
