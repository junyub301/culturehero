import { styled } from "styled-components";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
}

export default function Textarea({ label, ...props }: TextareaProps) {
    return (
        <Wrap>
            <label>{label}</label>
            <div>
                <CustomTextarea {...props} />
            </div>
        </Wrap>
    );
}

export const Wrap = styled.div`
    width: 100%;
`;
const CustomTextarea = styled.textarea`
    margin-top: 0.5em;
    min-height: 5rem;
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid gray;
`;
