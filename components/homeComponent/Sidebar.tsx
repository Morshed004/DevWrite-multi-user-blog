'use client';

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

interface SidebarProps {
  categories: string[];
  posts: Post[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Sidebar({
  categories,
  posts,
  selectedCategory,
  onCategoryChange
}: SidebarProps) {
  return (
    <div className="lg:sticky lg:top-24 space-y-8">
      {/* Categories */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {/* All Categories button */}
          <button
            onClick={() => onCategoryChange('All')}
            className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors text-left ${
              selectedCategory === 'All'
                ? 'bg-blue-50 text-blue-700'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
          >
            <span>All Categories</span>
            <span className={`px-2 py-1 rounded text-sm ${
              selectedCategory === 'All'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {posts.length}
            </span>
          </button>

          {/* Individual categories */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors text-left ${
                selectedCategory === category
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span>{category}</span>
              <span className={`px-2 py-1 rounded text-sm ${
                selectedCategory === category
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {posts.filter(post => post.category === category).length}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}