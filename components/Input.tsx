import { styled } from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, type, ...props }: InputProps) {
    return (
        <Wrap>
            <label>{label}</label>
            <div>
                <CustomInput type={type || "text"} {...props} />
            </div>
        </Wrap>
    );
}

const Wrap = styled.div`
    width: 100%;
`;
const CustomInput = styled.input`
    margin-top: 0.5em;
    width: 100%;
    min-height: 2.5rem;
    white-space: pre-wrap;
    word-wrap: break-word;
    border-radius: 5px;
    border: 1px solid gray;
`;
