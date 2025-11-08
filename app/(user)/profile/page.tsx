import ProfileSkeleton from "@/components/Skeleton/ProfileSkeleton";
import ProfileContent from "./ProfileContent";
import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getServerSession } from "@/lib/action/get-session";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Profile"
}

// Main component with Suspense
export default async function Profile() {
  const session = await getServerSession();
  const user = session?.user;
  if(!user){
    redirect("/signin")
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-100/80 sticky top-0 z-50 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Logo Section */}
            <Link
              href="/"
              className="flex items-center space-x-3 group"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-white font-bold text-sm">DW</span>
                </div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                DevWrite
              </span>
            </Link>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Edit Profile Button */}
              <Link
                href="/profile/edit"
                className="group flex items-center space-x-2 bg-white text-gray-700 border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
              >
                <PencilIcon className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="font-medium hidden sm:inline-block">Edit Profile</span>
                <span className="font-medium sm:hidden">Edit</span>
              </Link>

              {/* New Post Button */}
              <Link
                href="/create-post"
                className="group relative flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <PlusIcon className="w-4 h-4 relative z-10 text-white" />
                <span className="font-medium relative z-10 hidden sm:inline-block">New Post</span>
                <span className="font-medium relative z-10 sm:hidden">New</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}