import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/auth/components/hooks/useCurrentUser";
import { useLogout } from "@/features/auth/components/hooks/useLogout";
import { useCreateNote } from "@/features/dashboard/hooks/useCreateNote";
import { useDeleteNote } from "@/features/dashboard/hooks/useDeleteNote";
import { useNotes } from "@/features/dashboard/hooks/useGetNotes";
import { Trash2 } from "lucide-react";
import { useState } from "react";

function DashboardPage() {
  const { data: user } = useCurrentUser(true);
  const { data: notes, isLoading } = useNotes();
  const createNote = useCreateNote();
  const deleteNote = useDeleteNote();
  const { mutate } = useLogout();

  const [title, setTitle] = useState("");

  const handleCreateNote = () => {
    if (!title.trim()) return;
    createNote.mutate({ title });
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-background pt-6">
      <div className="relative mx-auto min-h-screen max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center">
            <img
              src="/images/logo.png"
              className="mr-3 size-12 object-contain"
            />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <Button
            onClick={() => mutate()}
            className="text-base font-medium"
            variant="link"
          >
            Sign Out
          </Button>
        </div>

        {/* Welcome */}
        <div className="mx-6 mb-6 rounded-2xl border p-6 shadow-lg">
          <h2 className="mb-3 text-2xl font-bold text-black">
            Welcome, {user?.name}!
          </h2>
          <p className="text-base text-gray-600">Email: {user?.email}</p>
        </div>

        {/* Create Note */}
        <div className="mb-8 px-6">
          <div className="flex gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 rounded-xl border px-3 py-2"
              placeholder="Enter note title..."
              onKeyDown={(e) => e.key === "Enter" && handleCreateNote()}
            />
            <Button onClick={handleCreateNote}>Add</Button>
          </div>
        </div>

        {/* Notes */}
        <div className="px-6">
          <h3 className="mb-4 text-xl font-bold text-black">Notes</h3>

          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-3">
              {notes?.map((note) => (
                <div
                  key={note.id}
                  className="flex items-center justify-between rounded-2xl border bg-gray-50 p-4"
                >
                  <span className="text-base font-medium">{note.title}</span>
                  <button
                    onClick={() => deleteNote.mutate(note.id)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
