"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { styled } from "styled-components";

interface CreateData {
    title: string;
    password: string;
    userId: string;
    content: string;
}

const createBoard = async (body: CreateData) => {
    console.log("🚀 ~ file: page.tsx:15 ~ createBoard ~ body:", body);
    const data = await fetch("http://localhost:3000/api/board", {
        headers: {
            "Content-Type": `application/json`,
        },
        method: "POST",
        body: JSON.stringify(body),
    });
    const res = await data.json();
    return res;
};

export default function Board() {
    const router = useRouter();
    const { mutate } = useMutation(createBoard, {
        onSuccess: () => {
            router.push("/");
        },
    });
    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            const data = { userId, password, content, title } as CreateData;
            console.log("🚀 ~ file: page.tsx:41 ~ onSubmit ~ data:", data);
            mutate(data);
        }
    };

    const validate = () => {
        if (userId === "" || password === "" || title === "" || content === "") {
            console.log("없어요");
            return false;
        }
        return true;
    };

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <div className="user__info">
                    <div>
                        <div>id</div>
                        <div>
                            <input
                                type="text"
                                onChange={(e) => setUserId(e.currentTarget.value)}
                                value={userId}
                            />
                        </div>
                    </div>
                    <div>
                        <div>password: </div>
                        <div>
                            <input
                                type="password"
                                onChange={(e) => setPassword(e.currentTarget.value)}
                                value={password}
                            />
                        </div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div>title</div>
                    <div>
                        <input
                            type="text"
                            onChange={(e) => setTitle(e.currentTarget.value)}
                            value={title}
                        />
                    </div>
                </div>
                게시글:
                <textarea onChange={(e) => setContent(e.currentTarget.value)} value={content} />
                <button className="addBtn" type="submit">
                    추가
                </button>
            </Form>
        </div>
    );
}

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .user__info {
        display: flex;
        gap: 1rem;
        > div {
            display: flex;
            gap: 1rem;
        }
    }

    .addBtn {
        padding: 1rem;
        border: 1px solid blue;
        background-color: skyblue;
    }
`;
