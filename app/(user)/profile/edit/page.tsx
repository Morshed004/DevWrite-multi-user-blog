import ProfileEditSkeleton from "@/components/Skeleton/ProfileEditSkeleton";
import { Suspense } from "react";
import ProfileEditContent from "./ProfileEditContent";
import { Metadata } from "next";


export const metadata: Metadata ={
  title: "Edit Profile"
}

// Main component with Suspense
export default function ProfileEdit() {
  return (
    <Suspense fallback={<ProfileEditSkeleton />}>
      <ProfileEditContent />
    </Suspense>
  );
}