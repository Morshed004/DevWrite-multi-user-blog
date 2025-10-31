import Link from "next/link";
import { getAllPostSummaries } from "@/lib/data/post.dal";
import { DeleteButton } from "./delete-button";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default async function PostManagement() {
  // Get all posts and filter based on search
  const allPosts = await getAllPostSummaries();

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900">Post Management</h1>
          <Link 
            href="/admin" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {allPosts.length === 0 ? (
          // No posts state
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="max-w-md mx-auto">
              <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">No Posts Yet</h2>
              <p className="text-gray-600 mb-6">
                There are no posts to manage. Create post first to get started!
              </p>
            </div>
          </div>
        ) : (
          // Posts grid
          <>
            <div className="grid gap-6">
              {allPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-blue-900">{post.title}</h3>
                    <div className="flex items-center gap-2">
                      {/* Delete Button */}
                      <DeleteButton postId={post.id} />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.category && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {post.category}
                      </span>
                    )}
                    {post.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>By: {post.author.name || post.author.email}</span>
                      <span>Saves: {post.saveCount}</span>
                    </div>
                    <div className="text-right">
                      <div>Created: {new Date(post.createdAt).toLocaleDateString()}</div>
                      {post.updatedAt !== post.createdAt && (
                        <div>Updated: {new Date(post.updatedAt).toLocaleDateString()}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-sm text-blue-600">
              Showing {allPosts.length} of {allPosts.length} Posts
            </div>
          </>
        )}
      </div>
    </div>
  );
}