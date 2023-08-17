import { decrypt } from "@/utils";
import { NextResponse } from "next/server";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const data = await fetch(`${BASE_URL}/board/${id}`);
        const res = await data.json();
        if (decrypt(body.password) === decrypt(res.password)) {
            return NextResponse.json({ ok: true });
        } else {
            return NextResponse.json({ ok: false });
        }
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
