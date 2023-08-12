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

const Wrap = styled.div`
    width: 100%;
`;
const CustomTextarea = styled.textarea`
    margin-top: 0.5em;
    width: 100%;
    min-height: 5rem;
    border-radius: 5px;
    border: 1px solid gray;
`;
