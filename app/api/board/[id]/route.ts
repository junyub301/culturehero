import { Board } from "@/types/board";
import { NextResponse } from "next/server";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

export async function GET(_: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const res = await fetch(`${BASE_URL}/board/${id}`);
        const board = (await res.json()) as Board;

        return NextResponse.json({ board });
    } catch (error) {
        console.log(error);
    }
}

export async function PUT(req: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const res = await fetch(`${BASE_URL}/board/${id}`, {
            headers: {
                "Content-Type": `application/json`,
            },
            method: "PUT",
            body: JSON.stringify({ ...data, updatedAt: new Date() }),
        });
        const board = (await res.json()) as Board;

        return NextResponse.json({ board });
    } catch (error) {
        console.log(error);
    }
}

export async function DELETE(_: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const res = await fetch(`${BASE_URL}/board/${id}`, {
            method: "DELETE",
        });
        const board = (await res.json()) as Board;

        return NextResponse.json({ board });
    } catch (error) {
        console.log(error);
    }
}
