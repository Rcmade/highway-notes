import { useCurrentUser } from "@/features/auth/components/hooks/useCurrentUser";
import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export const PublicRoute = ({ children }: Props) => {
  const { data: user, isLoading } = useCurrentUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
