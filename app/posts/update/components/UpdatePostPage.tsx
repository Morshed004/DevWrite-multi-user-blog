import { getServerSession } from "@/lib/action/get-session";
import { redirect } from "next/navigation";
import UpdatePostClient from "./UpdatePostClient";

export default async function UpdatePostPage() {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) redirect("/")
  return (
      <UpdatePostClient />
  )
}