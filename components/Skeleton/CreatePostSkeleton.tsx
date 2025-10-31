export default function CreatePostSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Skeleton */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Page Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2"></div>
          </div>

          <div className="space-y-8">
            {/* Title Skeleton */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-24 mb-3"></div>
              <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
            </div>

            {/* Excerpt Skeleton */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-32 mb-3"></div>
              <div className="h-20 bg-gray-300 rounded-lg w-full mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-20 ml-auto"></div>
            </div>

            {/* Category Skeleton */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-20 mb-3"></div>
              <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
            </div>

            {/* Tags Skeleton */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 animate-pulse">
              <div className="h-5 bg-gray-300 rounded w-12 mb-3"></div>
              <div className="flex flex-wrap gap-2 mb-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-300 rounded-full w-16"></div>
                ))}
              </div>
              <div className="h-12 bg-gray-300 rounded-lg w-full"></div>
              <div className="flex justify-between mt-2">
                <div className="h-4 bg-gray-300 rounded w-32"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            </div>

            {/* Content Editor Skeleton */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Tab Header Skeleton */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  {['Write', 'Preview'].map((tab, i) => (
                    <div key={i} className="flex items-center space-x-2 px-6 py-4">
                      <div className="w-5 h-5 bg-gray-300 rounded"></div>
                      <div className="h-5 bg-gray-300 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Area Skeleton */}
              <div className="p-6">
                <div className="min-h-[500px] bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
                    <div className="h-5 bg-gray-300 rounded w-48 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}