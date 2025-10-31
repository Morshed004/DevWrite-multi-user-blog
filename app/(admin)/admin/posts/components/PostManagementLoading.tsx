export default function PostManagementLoading() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-64 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              {/* Title and Action Button Row */}
              <div className="flex justify-between items-start mb-4">
                <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
                <div className="h-8 w-20 bg-gray-300 rounded"></div>
              </div>
              
              {/* Excerpt Skeleton */}
              <div className="mb-4 space-y-2">
                <div className="h-4 w-full bg-gray-300 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              </div>
              
              {/* Tags and Categories Skeleton */}
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
                <div className="h-6 w-12 bg-gray-300 rounded"></div>
                <div className="h-6 w-14 bg-gray-300 rounded"></div>
                <div className="h-6 w-10 bg-gray-300 rounded"></div>
              </div>

              {/* Footer Info Skeleton */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-4">
                  <div className="h-4 w-32 bg-gray-300 rounded"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded"></div>
                </div>
                <div className="text-right space-y-1">
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                  <div className="h-3 w-20 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="mt-4">
          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}