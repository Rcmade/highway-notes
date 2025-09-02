import { type SignUpInput, signUpSchema } from "@/zodSchema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
const useSignUpForm = () => {
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      dob: "",
      email: "",
      otp: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: () => {},
  });
  const onSubmit = async (values: SignUpInput) => {
    mutate(values);
  };

  return {
    form,
    isLoading: true,
    onSubmit,
  };
};

export default useSignUpForm;
