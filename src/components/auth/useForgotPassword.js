import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { forgotPassword as forgotPasswordApi } from "../../services/apiAuth";
import { useMutation } from "@tanstack/react-query";

export function useForgotPassword() {
  const navigate = useNavigate();

  const { mutate: forgotPassword, isLoading } = useMutation({
    mutationFn: (email) => forgotPasswordApi(email),
    onSuccess: () => {
      toast.success("Please check your email for further instructions");
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err.message || "An error occurred during password reset");
    },
  });

  return { forgotPassword, isLoading };
}
