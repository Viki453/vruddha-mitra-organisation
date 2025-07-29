import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const tFilter = searchParams.get("filter")
    ? searchParams.get("filter").toLowerCase()
    : "all";

  const tSort = searchParams.get("sort-by")
    ? searchParams.get("sort-by").toLowerCase()
    : "oldest first";

  const tPage = parseInt(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", tFilter, tSort, tPage],
    queryFn: () => getBookings({ tFilter, tSort, tPage }),
    retry: 1,
  });

  if (error) throw new Error(error.message);

  const bookings = data?.bookings || [];
  const count = data?.count || 0;

  return { bookings, isLoading, count };
}
