'use client';

import { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { editProfile } from '@/lib/action/action';
import { getUserData } from '@/lib/data/user.dal';
import ProfileEditSkeleton from '@/components/Skeleton/ProfileEditSkeleton';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const expertiseOptions = [
  "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python",
  "Tailwind CSS", "Vue.js", "Angular", "Svelte", "GraphQL", "MongoDB",
  "PostgreSQL", "AWS", "Docker", "Kubernetes", "Machine Learning", "AI",
  "Web Development", "Mobile Development", "UI/UX Design", "DevOps"
];

interface Post {
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
  savePosts: Post[];
}

// Client component that uses the data
export default function ProfileEditContent() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentExpertise, setCurrentExpertise] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  // Fetch user data from API
  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const data = await getUserData();

        // Transform savePosts to match the expected format
        const transformedData = {
          ...data,
          savePosts: data.savePosts?.map((savePost: SavePost) => ({
            title: savePost.post.title,
            excerpt: savePost.post.excerpt,
            category: savePost.post.category
          })) || []
        };

        setUserData(transformedData);
      } catch {
        toast.error("Failed to load user data. Please try again.")
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData(prev => ({
        ...prev!,
        [name]: value
      }));
    }
  };

  const handleAddExpertise = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentExpertise.trim() && userData) {
      e.preventDefault();
      const newExpertise = currentExpertise.trim();
      if (!userData.skill.includes(newExpertise) && userData.skill.length < 8) {
        setUserData(prev => ({
          ...prev!,
          skill: [...prev!.skill, newExpertise]
        }));
        setCurrentExpertise('');
      }
    }
  };

  const handleRemoveExpertise = (expertiseToRemove: string) => {
    if (userData) {
      setUserData(prev => ({
        ...prev!,
        skill: prev!.skill.filter(exp => exp !== expertiseToRemove)
      }));
    }
  };

  const handleSelectExpertise = (expertise: string) => {
    if (userData && !userData.skill.includes(expertise) && userData.skill.length < 8) {
      setUserData(prev => ({
        ...prev!,
        skill: [...prev!.skill, expertise]
      }));
    }
  };

  const validateForm = (): string | null => {
    if (!userData?.name.trim()) {
      return 'Name is required';
    }
    if (!userData?.email.trim()) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return 'Invalid email format';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData) return;

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError)
      return;
    }

    startTransition(async () => {
      try {
        const result = await editProfile({
          name: userData.name,
          email: userData.email,
          bio: userData.bio || '',
          location: userData.location || '',
          website: userData.website || '',
          skill: userData.skill,
        });

        if (result.success) {
          toast.success("Profile updated successfully!")
          router.push("/profile")
        } else {
          toast.error("Failed to update profile")
        }
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Error updating profile. Please try again.')
      }
    });
  };
  // Loading state
  if (isLoading) {
    return <ProfileEditSkeleton />;
  }

  // Error state
  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-900 mt-4">Failed to load profile</h2>
          <p className="text-gray-600 mt-2">Please try again later</p>
          <Link
            href="/profile"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-xl border-b border-gray-100/60 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Back Button with Enhanced Visuals */}
            <Link
              href="/profile"
              className="group flex items-center space-x-2 select-none"
            >
              <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300">
                <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300">
                  <ArrowLeftIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Editing</p>
                  <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Profile Settings
                  </p>
                </div>
              </div>
            </Link>

            {/* Save Button with Enhanced States */}
            <button
              type="submit"
              form="profile-edit-form"
              disabled={isPending}
              className="group relative min-w-[140px] bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:scale-105 active:scale-95 overflow-hidden"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Loading State */}
              {isPending ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Saving...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-2 relative">
                  <CheckIcon className="w-4 h-4" />
                  <span>Save Changes</span>
                </div>
              )}

              {/* Success pulse effect */}
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Edit Profile</h1>
            <p className="text-gray-600 text-lg">Update your personal information and preferences</p>
          </div>

          <form id="profile-edit-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-3">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={userData.bio || ''}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about yourself, your interests, and what you write about..."
                />
                <p className="text-sm text-gray-500 mt-2">Brief description for your profile</p>
              </div>
            </div>

            {/* Location & Website */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-3">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={userData.location || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="City, Country"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-3">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    value={userData.website || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="yourwebsite.com"
                  />
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Add your skills and expertise
                  </label>
                  <input
                    type="text"
                    value={currentExpertise}
                    onChange={(e) => setCurrentExpertise(e.target.value)}
                    onKeyDown={handleAddExpertise}
                    placeholder="Type a skill and press Enter (max 8)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={userData.skill.length >= 8}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {userData.skill.length}/8 skills added
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {userData.skill.map((exp) => (
                    <span
                      key={exp}
                      className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium border border-blue-200 flex items-center space-x-2"
                    >
                      <span>{exp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveExpertise(exp)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-3">Quick select:</p>
                  <div className="flex flex-wrap gap-2">
                    {expertiseOptions
                      .filter(exp => !userData.skill.includes(exp))
                      .slice(0, 12)
                      .map((exp) => (
                        <button
                          key={exp}
                          type="button"
                          onClick={() => handleSelectExpertise(exp)}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                          disabled={userData.skill.length >= 8}
                        >
                          + {exp}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <Link
                href="/profile"
                className="w-full sm:w-auto text-center bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 border border-gray-300"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isPending ? 'Saving Changes...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}