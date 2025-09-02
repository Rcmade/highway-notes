import { LoginForm } from "@/features/auth/components/form/LoginForm";
import { useCurrentUser } from "@/features/auth/components/hooks/useCurrentUser";

export default function LoginPage() {
  const {data} = useCurrentUser()
  console.log({ data });
  return <LoginForm />;
}
