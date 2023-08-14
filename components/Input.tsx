import { styled } from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({ label, type, ...props }: InputProps) {
    return (
        <Wrap>
            <label className="input__label">{label}</label>
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
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid gray;
`;
