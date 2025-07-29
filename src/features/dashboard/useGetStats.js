import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getPastDaysBookings } from "../../services/apiBookings";

const queryClient = useQueryClient();

function useGetStats() {
  const { data: bookingStats, isLoading } = useMutation({
    mutationFn: () => getPastDaysBookings(days),
    onSuccess: () => queryClient.invalidateQueries["PastBookings"],
  });

  return { bookingStats, isLoading };
}
