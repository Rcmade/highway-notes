import { api, getReadableErrorMessage } from "@/lib/api";
import type { LoginResponseT, LoginVerifyResponseT } from "@/types/apiType";
import {
  loginSchema,
  loginVerifySchema,
  type LoginSchemaT,
  type LoginVerifySchemaT,
} from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useLoginForm = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<LoginSchemaT | LoginVerifySchemaT>({
    resolver: zodResolver(isOtpSent ? loginVerifySchema : loginSchema),
    defaultValues: {
      email: "",
      code: "",
      rememberMe: false,
    },
  });

  // Verify OTP mutation
  const { mutate: verifyOtpMutate, isPending: isVerifyingLoading } =
    useMutation<LoginVerifyResponseT, unknown, LoginVerifySchemaT>({
      mutationFn: async (input) => {
        const { data } = await api.post("/auth/login/verify", input);
        queryClient.invalidateQueries({ queryKey: ["me"] });
        return data;
      },
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(getReadableErrorMessage(error));
      },
    });

  // Request OTP mutation
  const { mutate, isPending } = useMutation<
    LoginResponseT,
    unknown,
    LoginSchemaT
  >({
    mutationFn: async (input) => {
      const { data } = await api.post("/auth/login/request", input);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setIsOtpSent(true);
    },
    onError: (error) => {
      toast.error(getReadableErrorMessage(error));
    },
  });

  const onSubmit = (values: LoginSchemaT | LoginVerifySchemaT) => {
    if (isOtpSent) {
      verifyOtpMutate(values as LoginVerifySchemaT);
    } else {
      mutate(values as LoginSchemaT);
    }
  };

  return {
    form,
    isLoading: isVerifyingLoading || isPending,
    onSubmit,
    isOtpSent,
    setIsOtpSent,
  };
};

export default useLoginForm;
