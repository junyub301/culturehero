import { css, styled } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variants?: "success" | "cancel";
}

const VARIANTS = {
    success: `
        --button-color: #ffffff;
        --button-bg-color: #613df3 ;
    `,
    cancel: `
        --button-color: #ffffff;
        --button-bg-color: #ec6371;
    `,
};

export default function Button({ variants = "success", type, children, ...props }: ButtonProps) {
    const colorVariants = VARIANTS[variants];
    return (
        <CustomButton variants={colorVariants} type={type || "button"} {...props}>
            {children}
        </CustomButton>
    );
}

const CustomButton = styled.button<{ variants?: string }>`
    ${(p) =>
        css`
            ${p.variants}
        `};
    width: 100%;
    background-color: var(--button-bg-color);
    color: var(--button-color);
    padding: 1rem;
    border-radius: 5px;
`;
