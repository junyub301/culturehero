import { useState } from "react";
import { styled } from "styled-components";
import Button from "./Button";
import Input from "./Input";

interface PromptProps {
    onClose: () => void;
    onSuccess: any;
    text: string;
    defaultValue?: string;
}

export default function Prompt({ onClose, onSuccess, text, defaultValue }: PromptProps) {
    const [value, setValue] = useState<string>(defaultValue || "");
    const onClick = async () => {
        if (typeof onSuccess === "function") {
            await onSuccess(value);
        }
        onClose();
    };

    return (
        <Overlay>
            <div className="prompt__wrap">
                <div className="prompt__header">
                    <button onClick={onClose}>x</button>
                </div>
                <div className="prompt__content">
                    <Input
                        label={text}
                        type="password"
                        onChange={(e) => setValue(e.currentTarget.value)}
                    />
                </div>
                <div>
                    <Button onClick={onClick}>확인</Button>
                </div>
            </div>
        </Overlay>
    );
}

const Overlay = styled.div`
    z-index: 10;
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    align-items: center;
    .prompt__wrap {
        border: 0.1px solid #c2c2c2;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        background-color: white;
        border-radius: 10px;
        padding: 1rem;
        min-width: 20rem;
    }
    .prompt__header {
        text-align: right;
        width: 100%;
    }
    .prompt__content {
        margin: 1rem 0;
    }
`;
