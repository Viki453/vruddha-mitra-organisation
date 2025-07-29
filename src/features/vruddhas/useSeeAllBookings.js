import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getBookingsByVruddha } from "../../services/apiBookings";

function useSeeAllBookings() {
  const [searchParams] = useSearchParams();
  const vId = searchParams.get("id");

  const tFilter = searchParams.get("filter") || "all";
  const tSort = searchParams.get("sort-by")?.toLowerCase() || "oldest first";

  const { data, isLoading, error } = useQuery({
    queryKey: ["allBookings", vId, tFilter, tSort],
    queryFn: () => getBookingsByVruddha({ vId, tFilter, tSort }),
    enabled: !!vId,
    retry: false,
  });

  if (error) throw new Error(error.message);

  return {
    bookings: data?.bookings || [],
    count: data?.count || 0,
    isLoading,
  };
}

export default useSeeAllBookings;
