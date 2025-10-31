// components/PostDetailSkeleton.tsx
export default function PostDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans animate-pulse">
      {/* Sticky Header Skeleton */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <div className="flex items-center justify-between">
            {/* Back button skeleton */}
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="hidden sm:block w-20 h-4 bg-gray-200 rounded"></div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
              <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <article className="py-12 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Hero Section Skeleton */}
          <div className="text-center mb-16">
            {/* Category badge skeleton */}
            <div className="inline-block mb-6">
              <div className="w-24 h-6 bg-gray-200 rounded-full mx-auto"></div>
            </div>

            {/* Title skeleton */}
            <div className="mb-6">
              <div className="w-3/4 h-8 bg-gray-200 rounded mx-auto mb-4"></div>
              <div className="w-1/2 h-8 bg-gray-200 rounded mx-auto"></div>
            </div>

            {/* Excerpt skeleton */}
            <div className="mb-8 max-w-3xl mx-auto">
              <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
              <div className="w-2/3 h-4 bg-gray-200 rounded mx-auto"></div>
            </div>

            {/* Meta information skeleton */}
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* Article Content Skeleton */}
          <div className="prose prose-lg md:prose-xl max-w-none">
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Post Footer Skeleton */}
          <div className="mt-16">
            
            {/* Tags Section Skeleton */}
            <div className="mb-12">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-16 h-6 bg-gray-200 rounded"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-8 bg-gray-200 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Author Bio Skeleton */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
                
                {/* Author Avatar Skeleton */}
                <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-full"></div>
                
                <div className="flex-1 space-y-4">
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  <div className="w-48 h-6 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                    <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
                  </div>
                  
                  {/* Saves Count Skeleton */}
                  <div className="w-40 h-6 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </article>

      {/* Footer Skeleton */}
      <footer className="bg-white border-t border-gray-100 py-12 mt-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="w-48 h-4 bg-gray-200 rounded mx-auto"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}