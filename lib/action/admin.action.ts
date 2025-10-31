"use server";
import { updateTag } from "next/cache";
import prisma from "../prisma";
import { getServerSession } from "./get-session";
import { redirect } from "next/navigation";

export async function adminCheck() {
  try {
    const session = await getServerSession()

    const userId = session?.user?.id;
    if (!userId) return false;

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    return !!user?.isAdmin;
  } catch (error) {
    console.error("adminCheck error:", error);
    return false;
  }
}

export const deleteUser = async (userId: string) => {
  const session = await getServerSession();
  const currentUser = session?.user;

  if(!currentUser?.isAdmin) throw new Error("Forbidden request");

  // Prevent users from deleting themselves
  if(currentUser.id === userId) {
    throw new Error("Cannot delete your own account");
  }

  await prisma.user.delete({
    where: {
      id: userId
    }
  });

  updateTag("user");
};



export const adminDeletePost = async (postId: string) => {
  const session = await getServerSession();
  const user = session?.user;

  if(!session || !user) redirect("/signin")

  // Use AND instead of OR, and clarify the error message
  if(!user.isAdmin) {
    throw new Error("Unauthorized Request: Admin access required")
  }

  await prisma.post.delete({
    where: {
      id: postId
    }
  })

  updateTag("post")
}