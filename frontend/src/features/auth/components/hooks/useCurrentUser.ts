import { api } from "@/lib/api";
import type { UserT } from "@/types/apiType";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me", {
        withCredentials: true,
      });
      return res.data as UserT;
    },
  });
}
