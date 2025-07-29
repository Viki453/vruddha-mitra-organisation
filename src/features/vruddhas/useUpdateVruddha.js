import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVruddha } from "../../services/apiVruddhas";
import toast from "react-hot-toast";

export default function useUpdateVruddha() {
  const queryClient = useQueryClient();

  const { mutate: updateVruddha, isLoading: isUpdatingVruddha } = useMutation({
    mutationFn: ({ newVruddha, id }) => editVruddha({ newVruddha, id }),
    onSuccess: () => {
      toast.success("Vruddha successfully edited!");
      queryClient.invalidateQueries(["vruddha"]);
    },
  });

  return { isUpdatingVruddha, updateVruddha };
}
