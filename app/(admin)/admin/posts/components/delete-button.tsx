"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { adminDeletePost } from "@/lib/action/admin.action";
import { toast } from "sonner";

interface DeleteButtonProps {
  postId: string;
}

export function DeleteButton({ postId }: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return;
    }

    startTransition(async () => {
      try {
        await adminDeletePost(postId);
        toast.success("Post deleted successfully")
        router.refresh();
      } catch (error) {
        console.error("Failed to delete post:", error);
        alert(error instanceof Error ? error.message : "Failed to delete post");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
    >
      {isPending ? "Deleting..." : "Delete Post"}
    </button>
  );
}