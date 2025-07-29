import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import { getBooking } from "../../services/apiBookings";

function useBookingDetails() {
  const [searchParams] = useSearchParams();
  const tFilter = searchParams.get("filter")?.toLowerCase() || "all";
  const tSort = searchParams.get("sort-by")?.toLowerCase() || "a-z";
  const { id } = useParams();

  const {
    data: booking,
    isLoading: isLoadingBooking,
    error,
  } = useQuery({
    queryFn: () => getBooking({ id, tFilter, tSort }),
    queryKey: ["booking", id, tFilter, tSort],
    enabled: !!id,
  });

  return { booking, isLoadingBooking, error };
}

export default useBookingDetails;
