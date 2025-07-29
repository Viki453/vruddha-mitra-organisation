import { useQuery } from "@tanstack/react-query";
import { getPastDaysBookings } from "../../services/apiBookings";

function useGetBookingStats(days) {
  return useQuery({
    queryKey: ["PastBookings", days],
    queryFn: () => getPastDaysBookings(days),
    keepPreviousData: true,
  });
}

export default useGetBookingStats;
