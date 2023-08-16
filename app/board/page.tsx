"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Textarea from "@/components/Textarea";
import useMutations from "@/lib/useMutations";
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

export default function Board() {
    const router = useRouter();
    const { mutate } = useMutations({
        url: `board`,
        method: "POST",
        onSuccessFn: () => router.push("/"),
    });

    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
            const data = { userId, password, content, title } as CreateData;
            mutate(data);
        }
    };

    const validate = () => {
        if (userId === "" || password === "" || title === "" || content === "") {
            alert("값을 입력하세요.");
            return false;
        }
        return true;
    };

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <div className="user__info">
                    <Input
                        label="Id*"
                        onChange={(e) => setUserId(e.currentTarget.value)}
                        value={userId}
                    />
                    <Input
                        label="Password*"
                        type="password"
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        value={password}
                    />
                </div>
                <div>
                    <Input
                        label="Title*"
                        onChange={(e) => setTitle(e.currentTarget.value)}
                        value={title}
                    />
                </div>
                <Textarea
                    label="Content*"
                    onChange={(e) => setContent(e.currentTarget.value)}
                    value={content}
                />
                <div className="create__footer">
                    <Button onClick={() => router.push("/")}>취소</Button>
                    <Button type="submit">추가</Button>
                </div>
            </Form>
        </div>
    );
}

const Form = styled.form`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    > .user__info {
        display: flex;
        gap: 1rem;
    }

    .create__footer {
        display: flex;
        gap: 5px;
    }
`;
