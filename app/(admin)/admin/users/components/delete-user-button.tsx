"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/lib/action/admin.action";
import { toast } from "sonner";

interface DeleteUserButtonProps {
  userId: string;
  userEmail: string;
}

export function DeleteUserButton({ userId, userEmail }: DeleteUserButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete user ${userEmail}? This action cannot be undone and will delete all their posts.`)) {
      return;
    }

    startTransition(async () => {
      try {
        await deleteUser(userId);
        toast.success("User deleted successfully")
        router.refresh();
      } catch (error) {
        console.error("Failed to delete user:", error);
        alert(error instanceof Error ? error.message : "Failed to delete user");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
    >
      {isPending ? "Deleting..." : "Delete User"}
    </button>
  );
}