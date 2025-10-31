import { Suspense } from 'react';
import PostDetail from '../components/PostDetail';
import PostDetailSkeleton from '@/components/Skeleton/PostDetailSkeleton';
import { Metadata } from 'next';
import { getAllPosts, getPostById } from '@/lib/action/action';
import Footer from '@/components/Footer';


export async function generateStaticParams() {
  const posts = await getAllPosts();

  if (!posts || posts.length === 0) {
    return [{ slug: "placeholder" }];
  }

  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostById(slug)

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      tags: post.tags,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      title: post.title,
      description: post.excerpt,
    },
  };
}



export default async function PostDetailPage({params}: {params: Promise<{slug: string}>}) {
  const {slug} = await params;
  return (
    <>
      <Suspense fallback={<PostDetailSkeleton />}>
        <PostDetail slug={slug} />
      </Suspense>

      {/* Footer */}
      <Footer />
    </>
  )
}
