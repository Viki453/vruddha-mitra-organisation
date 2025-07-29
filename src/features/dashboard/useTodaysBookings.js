import { useQuery } from "@tanstack/react-query";
import { getTodaysBookings } from "../../services/apiBookings";

function useTodaysBookings() {
  const today = new Date();

  const {
    data: todayBookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["TodayBookings", today.toDateString()],
    queryFn: () => getTodaysBookings(today),
    retry: false,
  });

  if (error) console.log(error.message);

  return { todayBookings, isLoading, error };
}

export default useTodaysBookings;
