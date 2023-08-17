"use client";

import { styled } from "styled-components";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <html>
            <body>
                <ErrorWrap>
                    <h1>{error.message}</h1>
                    <div>
                        <button onClick={() => reset()}>재시도</button>
                    </div>
                </ErrorWrap>
            </body>
        </html>
    );
}

const ErrorWrap = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
