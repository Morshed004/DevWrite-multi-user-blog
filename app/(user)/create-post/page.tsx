
import { Suspense } from 'react';
import CreatePostSkeleton from '@/components/Skeleton/CreatePostSkeleton';
import { Metadata } from 'next';
import CreatePostPage from './components/CreatePostPage';
import { getServerSession } from '@/lib/action/get-session';
import { redirect } from 'next/navigation';

export const metadata: Metadata ={
  title: "Create Post",
  description: "Create and share your insights on DevWrite — the community where developers write about code, creativity, and technology. Start contributing thoughtful articles made by developers, for developers."
}

export default async function CreatePost() {
  const session = await getServerSession();
  const user = session?.user;
  if(!user) redirect("/signin")
  return (
    <Suspense fallback={<CreatePostSkeleton />}>
      <CreatePostPage />
    </Suspense>
  )
}
