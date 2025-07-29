import { useQuery } from "@tanstack/react-query";
import { getVruddhas } from "../../services/apiVruddhas";
import { useSearchParams } from "react-router";

export function useVruddhas() {
  const [searchParams] = useSearchParams();
  const tFilter = searchParams.get("filter")?.toLowerCase() || "all";
  const tSort = searchParams.get("sort-by") || "A-Z";
  const tPage = parseInt(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["vruddhas", tFilter, tSort, tPage],
    queryFn: () => getVruddhas({ tFilter, tSort, tPage }),
  });

  if (error) throw new Error(error.message);

  const vruddhas = data?.vruddhas || [];
  const count = data?.count || 0;

  return { vruddhas, count, isLoading };
}
