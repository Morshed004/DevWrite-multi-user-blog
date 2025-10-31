
import { Suspense } from 'react';
import CreatePostSkeleton from '@/components/Skeleton/CreatePostSkeleton';
import { Metadata } from 'next';
import CreatePostPage from './components/CreatePostPage';

export const metadata: Metadata ={
  title: "Create Post",
  description: "Create and share your insights on DevWrite — the community where developers write about code, creativity, and technology. Start contributing thoughtful articles made by developers, for developers."
}

export default async function CreatePost() {
  return (
    <Suspense fallback={<CreatePostSkeleton />}>
      <CreatePostPage />
    </Suspense>
  )
}
