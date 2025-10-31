'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarIcon,
  UserIcon,
  ClockIcon,
  BookmarkIcon,
  ShareIcon,
  ArrowLeftIcon,
  TagIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import MarkdownPreview from '@/components/MarkdownPreview'; 
import PostDetailSkeleton from '@/components/Skeleton/PostDetailSkeleton';
import { getPostById, savePost, unsavePost } from '@/lib/action/action';
import { getServerSession } from '@/lib/action/get-session';
import { toast } from 'sonner';

interface User {
  name: string;
  bio: string | null;
}

interface SavePost {
  userId: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  savePosts: SavePost[];
}

export default function PostDetail({slug}: {slug: string}) {
  const [isSaved, setIsSaved] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch current user on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const session = await getServerSession();
        if(session){
          const userId = session.user.id;
          setCurrentUserId(userId);
        }
      } catch {
        setCurrentUserId(null)
      }
    };

    fetchCurrentUser();
  }, []);

  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const data: Post = await getPostById(slug);
        setPost(data);

        // Check if current user has saved this post
        if (currentUserId && data.savePosts) {
          const userHasSaved = data.savePosts.some(
            (savePost) => savePost.userId === currentUserId
          );
          setIsSaved(userHasSaved);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPost();
    }
  }, [slug, currentUserId]);

  const handleSaveToggle = async () => {
    if (!post || !currentUserId) {
      return;
    }

    try {
      setIsSaving(true);

      if (isSaved) {
        await unsavePost(post.id);
        toast.success("Unsaved the post successfully");
        setIsSaved(false);
        setPost(prev => prev ? {
          ...prev,
          savePosts: prev.savePosts.filter(save => save.userId !== currentUserId)
        } : null);
      } else {
        await savePost(post.id);
        toast.success("Saved the post successfully");
        setIsSaved(true);
        setPost(prev => prev ? {
          ...prev,
          savePosts: [...prev.savePosts, { userId: currentUserId }]
        } : null);
      }
    } catch (err) {
      console.error('Failed to toggle save:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
  const url = window.location.href;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (!successful) throw new Error('Fallback copy failed');
    }

    toast.success("Link copid!")
  } catch (err) {
    console.error('Failed to copy:', err);
    alert('Failed to copy link. Please manually copy the URL from the address bar.');
  }
};


  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const calculateReadTime = (content?: string) => {
    if (!content) return 'Unknown read time';
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return <PostDetailSkeleton />;
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg">
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <div className="w-12 h-12 bg-red-500 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error ? 'Error loading post' : 'Post not found'}
          </h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            {error || 'The post you are looking for does not exist or may have been moved.'}
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl select-none hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Sticky Header (Simplified and cleaner) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="group flex items-center space-x-2 text-gray-700 select-none hover:text-blue-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
              <span className="hidden sm:inline font-medium">Back to Home</span>
            </Link>

            <div className="flex items-center space-x-3">
              {/* Save Button */}
              <button
                onClick={handleSaveToggle}
                disabled={isSaving || !currentUserId}
                className="p-2.5 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md active:scale-95 transform"
                title={currentUserId ? (isSaved ? 'Unsave post' : 'Save post') : 'Login to save posts'}
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                ) : isSaved ? (
                  <BookmarkSolidIcon className="w-5 h-5 text-blue-600" />
                ) : (
                  <BookmarkIcon className="w-5 h-5 text-gray-500 hover:text-blue-600" />
                )}
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="p-2.5 bg-gray-100 rounded-lg hover:bg-green-100 transition-colors shadow-sm hover:shadow-md active:scale-95 transform"
                title="Share this post"
              >
                <ShareIcon className="w-5 h-5 text-gray-500 hover:text-green-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Hero Section (Focused on Title and Meta) */}
          <div className="text-center mb-16">
            
            {/* Category Badge */}
            <div className="inline-block mb-6">
                <span className="inline-flex items-center space-x-2 bg-blue-500/10 text-blue-600 border border-blue-200 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                    <TagIcon className="w-4 h-4" />
                    <span>{post.category}</span>
                </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            {/* Meta Information (Cleaned up and integrated) */}
            <div className="flex items-center justify-center space-x-6 text-gray-500 text-base md:text-lg">
              
              {/* Author */}
              <div className="flex items-center space-x-2">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <span className="font-semibold text-gray-700">{post.user.name}</span>
              </div>

              {/* Date */}
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                <CalendarIcon className="w-5 h-5 text-gray-400" />
                <span>{formatDate(post.createdAt)}</span>
              </div>

              {/* Read Time */}
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-6">
                <ClockIcon className="w-5 h-5 text-gray-400" />
                <span>{calculateReadTime(post.content)}</span>
              </div>

            </div>
          </div>

          {/* Article Content (Clean, minimal container with larger text) */}
          <div className="prose prose-lg md:prose-xl max-w-none">
            <article className="prose text-gray-800 leading-relaxed text-lg md:text-xl">
              <MarkdownPreview content={post.content} />
            </article>
          </div>
          
          {/* Post Footer: Tags and Author Bio (Integrated and cleaner) */}
          <div className="mt-16">
            
            {/* Tags Section */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center space-x-3">
                <TagIcon className="w-6 h-6 text-blue-500" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-base font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer border border-transparent hover:border-blue-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Bio (Clean, modern design) */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                
                {/* Author Avatar Placeholder */}
                <div className="flex-shrink-0 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg select-none">
                  {post.user.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">Written by</h3>
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{post.user.name}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                    {post.user.bio || `Welcome to my blog! I share insights about technology, development, and more. Stay tuned for regular updates.`}
                  </p>
                  
                  {/* Saves Count */}
                  <div className="mt-6 flex items-center space-x-2 text-base text-gray-500 bg-gray-50 px-4 py-2 rounded-full w-fit">
                    <EyeIcon className="w-5 h-5 text-blue-500" />
                    <span>{post.savePosts.length} users saved this post</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </article>

      
    </div>
  );
}