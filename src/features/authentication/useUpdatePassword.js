import toast from "react-hot-toast";
import { updatePassword as updatePasswordApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";

function useUpdatePassword() {
  const { mutate: updatePassword, isLoading: isUpdatingPassword } = useMutation(
    {
      mutationFn: ({ password }) => updatePasswordApi({ password }),
      onSuccess: () => {
        toast.success("Password successfully changed");
      },
      onError: () => {
        toast.error("Some error Occured");
      },
    }
  );
  return { updatePassword, isUpdatingPassword };
}

export default useUpdatePassword;
