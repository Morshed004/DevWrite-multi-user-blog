'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CalendarIcon,
  EnvelopeIcon,
  BookmarkIcon,
  PlusIcon,
  DocumentTextIcon,
  MapPinIcon,
  LinkIcon,
  PencilIcon,
  UserCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { getUserData } from '@/lib/data/user.dal';
import ProfileSkeleton from '@/components/Skeleton/ProfileSkeleton';
import { userDeletePost } from '@/lib/action/action';
import { toast } from 'sonner';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
}

interface SavePost {
  post: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
  };
}

interface UserData {
  id: string;
  name: string;
  email: string;
  bio: string | null;
  location: string | null;
  website: string | null;
  skill: string[];
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
  savePosts: SavePost[];
}

// Client component that uses the data
export default function ProfileContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleUpdate = (postId: string) => {
    router.push(`/posts/update/${postId}`);
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return;
    }

    setDeletingPostId(postId);
    try {
      const result = await userDeletePost(postId);
      if (result.success) {
        toast.success("Post deleted successfully")
        // Refresh the user data to remove the deleted post
        const updatedData = await getUserData();
        setUserData(updatedData);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete post');
    } finally {
      setDeletingPostId(null);
    }
  };

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg mb-4">Error: {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">No user data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200/50 p-8 mb-8">
          <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 bg-blue-500 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {getInitials(userData.name)}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white rounded-full p-2">
                  <UserCircleIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold text-gray-900">{userData.name}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600">
                    <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-xl">
                      <EnvelopeIcon className="w-5 h-5" />
                      <span className="font-medium">{userData.email}</span>
                    </div>
                    {userData.emailVerified && (
                      <div className="flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                        <span className="text-sm font-medium">✓ Email Verified</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{userData.posts.length}</div>
                    <div className="text-gray-600 text-sm">Articles</div>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{userData.savePosts.length}</div>
                    <div className="text-gray-600 text-sm">Saved</div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              {userData.bio && (
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About Me</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{userData.bio}</p>
                </div>
              )}

              {/* Contact & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location */}
                {userData.location && (
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                    <MapPinIcon className="w-6 h-6 text-gray-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500">Location</div>
                      <div className="text-gray-900 font-medium">{userData.location}</div>
                    </div>
                  </div>
                )}

                {/* Website */}
                {userData.website && (
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                    <LinkIcon className="w-6 h-6 text-gray-600 flex-shrink-0" />
                    <div>
                      <div className="text-sm text-gray-500">Website</div>
                      <a
                        href={userData.website.startsWith('http') ? userData.website : `https://${userData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-medium break-all"
                      >
                        {userData.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Skills */}
              {userData.skill && userData.skill.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Skills & Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {userData.skill.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Join Date */}
              <div className="flex items-center space-x-2 text-gray-500 pt-4 border-t border-gray-200">
                <CalendarIcon className="w-5 h-5" />
                <span>Joined {formatDate(userData.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden mb-8">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200/50">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('posts')}
                className={`flex items-center space-x-3 px-8 py-4 border-b-2 font-medium text-lg transition-colors ${activeTab === 'posts'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <DocumentTextIcon className="w-6 h-6" />
                <span>My Articles</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {userData.posts.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`flex items-center space-x-3 px-8 py-4 border-b-2 font-medium text-lg transition-colors ${activeTab === 'saved'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
              >
                <BookmarkIcon className="w-6 h-6" />
                <span>Saved Articles</span>
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                  {userData.savePosts.length}
                </span>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* My Posts Tab */}
            {activeTab === 'posts' && (
              <div className="space-y-8">
                {userData.posts.length > 0 ? (
                  userData.posts.map((post, index) => (
                    <article key={index} className="group bg-gray-50 rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:border-blue-200/50">
                      <div className="flex items-start justify-between mb-4">
                        <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          {/* Update Button */}
                          <button
                            onClick={() => handleUpdate(post.id)}
                            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                            title="Edit post"
                          >
                            <PencilIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                          
                          {/* Delete Button */}
                          <button
                            onClick={() => handleDelete(post.id)}
                            disabled={deletingPostId === post.id}
                            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 disabled:bg-red-300 transition-colors duration-200 text-sm font-medium"
                            title="Delete post"
                          >
                            <TrashIcon className="w-4 h-4" />
                            <span className="hidden sm:inline">
                              {deletingPostId === post.id ? 'Deleting...' : 'Delete'}
                            </span>
                          </button>
                        </div>
                      </div>

                      <Link href={`/posts/${post.id}`}>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">{post.excerpt}</p>

                        <div className="flex items-center justify-between text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="font-medium">{formatDate(userData.createdAt)}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors group-hover:translate-x-1 duration-300">
                            Read Article →
                          </button>
                        </div>
                      </Link>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <DocumentTextIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles yet</h3>
                    <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                      Start sharing your knowledge and experiences with the community
                    </p>
                    <Link
                      href="/create-post"
                      className="inline-flex items-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg text-lg font-medium"
                    >
                      <PlusIcon className="w-6 h-6" />
                      <span>Write Your First Article</span>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Saved Posts Tab */}
            {activeTab === 'saved' && (
              <div className="space-y-8">
                {userData.savePosts.length > 0 ? (
                  userData.savePosts.map((savedPost) => (
                    <article key={savedPost.post.id} className="group bg-gray-50 rounded-2xl p-6 border border-gray-200/50 hover:shadow-lg transition-all duration-300 hover:border-blue-200/50">
                      <Link href={`/posts/${savedPost.post.id}`}>
                        <div className="flex items-start justify-between mb-4">
                          <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium">
                            {savedPost.post.category}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors cursor-pointer">
                          {savedPost.post.title}
                        </h3>
                        <p className="text-gray-700 mb-6 leading-relaxed text-lg">{savedPost.post.excerpt}</p>

                        <div className="flex items-center justify-between text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="font-medium">By {userData.name}</span>
                            <span>•</span>
                            <span>{formatDate(userData.createdAt)}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium transition-colors group-hover:translate-x-1 duration-300">
                            Read Article →
                          </button>
                        </div>
                      </Link>
                    </article>
                  ))
                ) : (
                  <div className="text-center py-16">
                    <BookmarkIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No saved articles</h3>
                    <p className="text-gray-600 text-lg max-w-md mx-auto">
                      Articles you save for later will appear here
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to share your knowledge?</h3>
          <p className="text-blue-100 mb-6 text-lg">
            Create engaging content and connect with readers worldwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/profile/edit"
              className="inline-flex items-center space-x-3 bg-white/20 text-white border border-white/30 px-8 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:shadow-lg text-lg font-medium"
            >
              <PencilIcon className="w-6 h-6" />
              <span>Edit Profile</span>
            </Link>
            <Link
              href="/create-post"
              className="inline-flex items-center space-x-3 bg-white text-blue-600 px-8 py-4 rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:shadow-lg text-lg font-medium"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Create New Article</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}