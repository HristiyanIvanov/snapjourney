import { useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { resetPassword } from "../../services/apiAuth";

export function useResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const accessToken = searchParams.get("access_token");

  const { mutate: resetPwd, isLoading } = useMutation({
    mutationFn: (newPassword) => resetPassword(accessToken, newPassword),
    onSuccess: () => {
      toast.success("Password reset successfully! You can now log in.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { resetPwd, isLoading };
}
