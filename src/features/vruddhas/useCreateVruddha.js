import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addVruddha } from "../../services/apiVruddhas";
import toast from "react-hot-toast";

export function useCreateVruddha() {
  const queryClient = useQueryClient();

  const { mutate: createVruddha, isLoading: isCreatingVruddha } = useMutation({
    mutationFn: addVruddha,
    onSuccess: () => {
      toast.success("Vruddha successfully created.");
      queryClient.invalidateQueries(["vruddhas"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreatingVruddha, createVruddha };
}
