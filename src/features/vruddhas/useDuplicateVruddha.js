import { useMutation } from "@tanstack/react-query";
import { addVruddha } from "../../services/apiVruddhas";
import toast from "react-hot-toast";

export default function useDuplicateVruddha() {
  const { mutate: duplicateVruddha, isLoading: isDuplicatingVruddha } =
    useMutation({
      mutationFn: addVruddha,
      onSuccess: () => {
        toast.success("Profile Successfully duplicated");
      },
    });

  return { duplicateVruddha, isDuplicatingVruddha };
}
