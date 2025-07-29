import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { changeStatus } from "../../services/apiBookings";

function useChangeBookingStatus(id) {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ newStatus, id }) => changeStatus({ newStatus, id }),

    onSuccess: (_data, variables) => {
      const { newStatus } = variables;
      queryClient.invalidateQueries(["booking", id]);
      queryClient.invalidateQueries(["vruddhas"]);
      toast.dismiss();
      toast.success(
        newStatus === "ongoing" ? "Visit has started" : "Visit has completed"
      );
    },

    onError: (err) => {
      toast.error(err.message);
      console.error(err.message);
    },
  });

  return { mutate, isLoading };
}

export default useChangeBookingStatus;
