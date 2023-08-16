import { useMutation, useQueryClient } from "@tanstack/react-query";

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
}: useMutationsProps) {
    const queryClient = useQueryClient();

    async function mutation(data?: any) {
        const newData =
            method === "POST"
                ? { ...data, createdAt: new Date(), updatedAt: null }
                : method === "PUT"
                ? { ...data, updatedAt: new Date() }
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
        try {
            const res = await fetch(`${BASE_URL}${url}`, fetchOption);
            const data = await res.json();
            return data;
        } catch (error) {}
    }

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
