import { getServerSession } from "@/lib/action/get-session";
import CreatePostClient from "./CreatePostClient";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/")
  return (
      <CreatePostClient />
  )
}