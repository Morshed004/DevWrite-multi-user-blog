import ProfileEditSkeleton from "@/components/Skeleton/ProfileEditSkeleton";
import { Suspense } from "react";
import ProfileEditContent from "./ProfileEditContent";
import { Metadata } from "next";
import { getServerSession } from "@/lib/action/get-session";
import { redirect } from "next/navigation";


export const metadata: Metadata ={
  title: "Edit Profile"
}

// Main component with Suspense
export default async function ProfileEdit() {
  const session = await getServerSession();
  const user = session?.user;
  if(!user) redirect("/signin")
  return (
    <Suspense fallback={<ProfileEditSkeleton />}>
      <ProfileEditContent />
    </Suspense>
  );
}