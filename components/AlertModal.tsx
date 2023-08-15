import { styled } from "styled-components";
import Button from "./Button";

export default function AlertModal({
    children,
    onClose,
    onSuccess,
}: {
    children: React.ReactNode;
    onSuccess: any;
    onClose: () => void;
}) {
    return (
        <Overlay>
            <div className="alert__wrap">
                <div className="alert__header">
                    <button onClick={onClose}>x</button>
                </div>
                <div className="alert__content">{children}</div>
                <div>
                    <Button>확인</Button>
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
    .alert__wrap {
        border: 0.1px solid #c2c2c2;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
        background-color: white;
        border-radius: 10px;
        padding: 1rem;
        min-width: 20rem;
    }
    .alert__header {
        text-align: right;
        width: 100%;
    }
    .alert__content {
        margin: 1rem 0;
    }
`;
