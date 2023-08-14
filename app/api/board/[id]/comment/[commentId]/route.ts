import { NextResponse } from "next/server";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";
export async function DELETE(
    req: Request,
    { params: { id, commentId } }: { params: { id: string; commentId: string } }
) {
    try {
        const res = await fetch(`${BASE_URL}/board/${id}/comment/${commentId}`, {
            method: "DELETE",
        });
        const comment = await res.json();

        return NextResponse.json({ comment });
    } catch (error) {
        console.log(error);
    }
}

export async function PUT(
    req: Request,
    { params: { id, commentId } }: { params: { id: string; commentId: string } }
) {
    try {
        const data = await req.json();
        const res = await fetch(`${BASE_URL}/board/${id}/comment/${commentId}`, {
            headers: {
                "Content-Type": `application/json`,
            },
            method: "PUT",
            body: JSON.stringify({ ...data, updatedAt: new Date() }),
        });
        const comment = await res.json();

        return NextResponse.json({ comment });
    } catch (error) {
        console.log(error);
    }
}
