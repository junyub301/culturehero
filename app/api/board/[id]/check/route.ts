import { NextResponse } from "next/server";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
    const data = await req.json();
    const res = await fetch(`${BASE_URL}/board/${id}`);

    const resData = await res.json();
    return NextResponse.json({ resData });
}
