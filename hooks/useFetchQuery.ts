import { Colors } from "@/constants/Colors";
import { propsEvolutionChainLink } from "@/functions/pokemon";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

const endpoint = "https://pokeapi.co/api/v2";

type API = {
    "/pokemon?limit:36": {
        count: number;
        next: string | null;
        results: { name: string; url: string }[];
    };
    "/pokemon/[id]": {
        id: number;
        name: string;
        url: string;
        weight: number;
        height: number;
        moves: { move: { name: string } }[];
        stats: {
            base_stat: number;
            stat: { name: string };
        }[];
        cries: { latest: string };
        types: {
            type: { name: keyof (typeof Colors)["type"] };
        }[];
    };
    "/pokemon-species/[id]": {
        flavor_text_entries: {
            flavor_text: string;
            language: { name: string };
        }[];
        evolution_chain: { url: string };
        gender_rate: number;
    };
    "/evolution-chain/[id]": {
        chain: propsEvolutionChainLink;
        id: number;
    };
};

export function useFetchQuery<T extends keyof API>(path: T, params?: Record<string, string | number>) {
    const localUrl = endpoint + Object.entries(params ?? {}).reduce((acc, [key, value]) => acc.replaceAll(`[${key}]`, value), path);
    return useQuery({
        queryKey: [localUrl],
        queryFn: () => {
            return fetch(localUrl).then((r) => r.json() as Promise<API[T]>);
        },
    });
}

export function useInfiniteFetchQuery<T extends keyof API>(path: string) {
    return useInfiniteQuery({
        queryKey: [path],
        initialPageParam: endpoint + path,
        queryFn: ({ pageParam }) => {
            return fetch(pageParam, {
                headers: {
                    Accept: "application/json",
                },
            }).then((r) => r.json() as Promise<API[T]>);
        },
        getNextPageParam: (lastPage) => {
            if ("next" in lastPage) {
                return lastPage.next;
            }
            null;
        },
    });
}
