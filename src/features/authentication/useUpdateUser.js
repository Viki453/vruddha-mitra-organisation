import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isLoading } = useMutation({
    mutationFn: ({ firstName, avatar }) => updateUserApi({ firstName, avatar }),
    onSuccess: (data) => {
      console.log(data);
      toast.success("Profile successfully updated");
      queryClient.refetchQueries({ queryKey: ["user"] });
    },
    onError: () => {
      toast.error("Some error occured");
    },
  });

  return { updateUser, isLoading };
}
