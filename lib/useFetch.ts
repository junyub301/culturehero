import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://64d5df4f613ee4426d97b2e2.mockapi.io/api/v1/";

export default function useFetch<T>(url: string, queryKey: any) {
    const query = async () => {
        try {
            const res = await fetch(`${BASE_URL}${url}`);
            const data = await res.json();
            return data;
        } catch (error) {
            console.log("🚀 ~ file: useFetch.ts:26 ~ query ~ error:", error);
        }
    };

    return useQuery<T, Error, T>({ queryFn: query, queryKey });
}
