'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';

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
}

interface User {
  id: string;
}

interface PostsGridProps {
  posts: Post[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (term: string) => void;
}

export default function PostsGrid({
  posts,
  categories,
  selectedCategory,
  onCategoryChange,
  onSearch,
}: PostsGridProps) {

  return (
    <>
      
      {/* Posts List or No Posts Found */}
      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-xl">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-6">
              {selectedCategory === 'All' 
                ? "We couldn't find any posts matching your search."
                : `No posts found in the "${selectedCategory}" category.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onCategoryChange('All');
                  onSearch('');
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                View All Posts
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Posts List */}
          <div className="space-y-8">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>

          {/* Load More */}
          {/* {posts.length > 10 && <div className="text-center mt-12">
            <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Load More Articles
            </button>
          </div>} */}
        </>
      )}
    </>
  );
}