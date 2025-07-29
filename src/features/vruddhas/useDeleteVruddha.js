import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVruddha as deleteVruddhaAPI } from "../../services/apiVruddhas";
import toast from "react-hot-toast";

export default function useDeleteVruddha() {
  const queryClient = useQueryClient();
  const { mutate: deleteVruddha, isLoading: isDeleting } = useMutation({
    mutationFn: deleteVruddhaAPI,
    onSuccess: () => {
      toast.success("Profile sucessfully deleted");
      queryClient.invalidateQueries(["vruddhas"]);
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteVruddha, isDeleting };
}
