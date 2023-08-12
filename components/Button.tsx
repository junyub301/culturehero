import { styled } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function Button({ type, children, ...props }: ButtonProps) {
    return (
        <CustomButton type={type || "button"} {...props}>
            {children}
        </CustomButton>
    );
}

const CustomButton = styled.button`
    width: 100%;
    background-color: #613df3;
    padding: 1rem;
    color: white;
    border-radius: 5px;
`;
