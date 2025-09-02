import { api } from "@/lib/api";
import type { Note } from "@/types/apiType";
import { useQuery } from "@tanstack/react-query";

export function useNotes() {
  return useQuery<Note[]>({
    queryKey: ["notes"],
    queryFn: async () => {
      const { data } = await api.get("/notes");
      return data;
    },
  });
}



