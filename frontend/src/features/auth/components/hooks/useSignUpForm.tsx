import { api, getReadableErrorMessage } from "@/lib/api";
import type { SignUpResponseT, SignUpVerifyResponseT } from "@/types/apiType";
import {
  signupSchema,
  signupVerifySchema,
  type SignupSchemaT,
  type SignupVerifySchemaT,
} from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useSignUpForm = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const form = useForm<SignupSchemaT | SignupVerifySchemaT>({
    resolver: zodResolver(isOtpSent ? signupVerifySchema : signupSchema),
    defaultValues: {
      name: "",
      dob: "",
      email: "",
      code: "",
    },
  });

  const { mutate: verifyOtpMutate, isPending: isVerifyingLoading } =
    useMutation<SignUpVerifyResponseT, unknown, SignupVerifySchemaT>({
      mutationFn: async (input) => {
        const { data } = await api.post("/auth/signup/verify", input);
        queryClient.invalidateQueries({ queryKey: ["me"] });
        return data;
      },

      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (error) => {
        console.log({ error }, getReadableErrorMessage(error));
        toast.error(getReadableErrorMessage(error));
      },
    });

  const { mutate, isPending } = useMutation<
    SignUpResponseT,
    unknown,
    SignupVerifySchemaT
  >({
    mutationFn: async (input) => {
      const { data } = await api.post("/auth/signup/request", input);
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
  const onSubmit = async (values: SignupVerifySchemaT) => {
    if (isOtpSent) {
      verifyOtpMutate(values);
    } else {
      mutate(values);
    }
  };

  return {
    form,
    isLoading: isVerifyingLoading || isPending,
    onSubmit,
    setIsOtpSent,
    isOtpSent,
  };
};

export default useSignUpForm;
