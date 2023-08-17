import { useCallback } from "react";
import { CustomError } from "./expection";

export default function useApiError() {
    const handler = useCallback(
        (status: number, defaultMessage: string, customMessage?: string) => {
            switch (status) {
                case 400:
                    throw new CustomError(customMessage || "잘못된 요청입니다." || defaultMessage);
                case 404:
                    throw new CustomError(
                        customMessage ||
                            "요청하신 URL은 없는 URL 입니다. 확인 후 다시 시도해주세요." ||
                            defaultMessage
                    );
                case 500:
                    throw new CustomError(
                        customMessage || "내부 서버 오류 입니다. " || defaultMessage
                    );
                default:
                    throw new CustomError(customMessage || defaultMessage);
            }
        },
        []
    );
    return { handler };
}
