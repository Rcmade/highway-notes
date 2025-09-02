import { api } from "@/lib/api";
import type { UserT } from "@/types/apiType";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useCurrentUser(redirect = false) {
  const navigate = useNavigate();
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        const res = await api.get("/auth/me", {
          withCredentials: true,
        });
        return res.data as UserT;
      } catch (error) {
        if (redirect) navigate("/auth/login");
        throw error;
      }
    },
  });
}
