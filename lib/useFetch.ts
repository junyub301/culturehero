import { useCallback } from "react";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import useApiError from "./useApiError";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

export default function useFetch<T>(url: string, queryKey: any): UseQueryResult<T, Error> {
    const { handler } = useApiError();
    const query = useCallback(async () => {
        const res = await fetch(`${BASE_URL}${url}`);

        if (!res.ok) {
            handler(res.status, res.statusText);
        }

        const data = await res.json();
        return data;
    }, [url, queryKey]);

    return useQuery<T, Error, T>({
        queryFn: query,
        queryKey,
    });
}
