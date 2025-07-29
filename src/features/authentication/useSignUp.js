import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useSignUp() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ firstName, email, password }) =>
      signupApi({ firstName, email, password }),
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "User successfully created. Please verify account by opening the link sent to your email"
      );
    },
  });
  return { signup, isLoading };
}

export default useSignUp;
