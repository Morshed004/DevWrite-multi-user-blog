import { Suspense } from 'react';
import BlogContent from './BlogContent';
import { getShuffledPosts } from '@/lib/action/action';
import BlogContentSkeleton from '../Skeleton/BlogContentSkeleton';
async function BlogContentWithData() {
  const shuffledPosts = await getShuffledPosts();

  const categories = [
    "Web Development",
    "React",
    "TypeScript",
    "CSS",
    "JavaScript",
    "Performance",
    "Accessibility",
    "DevOps",
    "Mobile Development",
    "UI/UX Design"
  ];

  return <BlogContent posts={shuffledPosts} categories={categories} />;
}

export default function BlogContentWrapper() {
  return (
    <Suspense fallback={<BlogContentSkeleton />}>
      <BlogContentWithData />
    </Suspense>
  );
}