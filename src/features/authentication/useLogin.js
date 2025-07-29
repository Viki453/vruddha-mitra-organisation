import { paperClasses } from "@mui/material/Paper";
import { useNavigate } from "react-router";
import { login as loginApi } from "../../services/apiAuth";

import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Incorrect credentials");
    },
  });

  return { login, isLoading };
}

export default useLogin;
