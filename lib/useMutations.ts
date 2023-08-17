import { useCallback } from "react";
import { UseMutationResult, useMutation, useQueryClient } from "@tanstack/react-query";
import useApiError from "./useApiError";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

interface useMutationsProps {
    url: string;
    method: "POST" | "PUT" | "DELETE";
    onSuccessFn?: any;
    invalidateQueryKey?: any;
    [key: string]: any;
}
export default function useMutations<T = any>({
    url,
    method,
    onSuccessFn,
    invalidateQueryKey,
    ...restOptions
}: useMutationsProps): UseMutationResult<T, Error> {
    const queryClient = useQueryClient();
    const { handler } = useApiError();
    const mutation = useCallback(
        async (body?: any) => {
            const newData =
                method === "POST"
                    ? { ...body, createdAt: new Date(), updatedAt: null }
                    : method === "PUT"
                    ? { ...body, updatedAt: new Date() }
                    : null;
            const fetchOption =
                method === "DELETE"
                    ? { method }
                    : {
                          headers: {
                              "Content-Type": "application/json",
                          },
                          method,
                          body: JSON.stringify(newData),
                      };
            const res = await fetch(`${BASE_URL}${url}`, fetchOption);
            if (!res.ok) {
                handler(res.status, res.statusText);
            }
            const data = await res.json();
            return data;
        },
        [url, method]
    );

    return useMutation(mutation, {
        onSuccess: () => {
            if (onSuccessFn) {
                onSuccessFn();
            }
            if (invalidateQueryKey) queryClient.invalidateQueries({ queryKey: invalidateQueryKey });
        },
        ...restOptions,
    });
}
