import { styled } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const VARIANTS = {
    success: `
        --button-color: #ffffff;
        --button-bg-color: #613df3 ;
        --button-hover-bg-color:#613df3;
    `,
    cancel: `
        --button-color: #ffffff;
        --button-bg-color: #dc3545;
        --button-hover-bg-color:#d92b3d;
    `,
    error: `
        --button-color: #000000;
        --button-bg-color:#d9d6d6;
        --button-hover-bg-color:#cfcccc;
    `,
};

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
