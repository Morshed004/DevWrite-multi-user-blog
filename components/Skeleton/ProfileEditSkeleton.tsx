
export default function ProfileEditSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Skeleton */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="h-6 bg-gray-300 rounded w-32"></div>
            </div>
            <div className="h-12 bg-gray-300 rounded-xl w-32 animate-pulse"></div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Page Header Skeleton */}
          <div className="text-center mb-8">
            <div className="h-10 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>

          <div className="space-y-8">
            {/* Basic Information Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 animate-pulse">
              <div className="h-7 bg-gray-300 rounded w-48 mb-6"></div>
              <div className="space-y-6">
                <div>
                  <div className="h-5 bg-gray-300 rounded w-32 mb-3"></div>
                  <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
                </div>
                <div>
                  <div className="h-5 bg-gray-300 rounded w-36 mb-3"></div>
                  <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
                </div>
              </div>
            </div>

            {/* Bio Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 animate-pulse">
              <div className="h-7 bg-gray-300 rounded w-32 mb-6"></div>
              <div>
                <div className="h-5 bg-gray-300 rounded w-24 mb-3"></div>
                <div className="h-24 bg-gray-300 rounded-xl w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-48"></div>
              </div>
            </div>

            {/* Contact Information Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 animate-pulse">
              <div className="h-7 bg-gray-300 rounded w-56 mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="h-5 bg-gray-300 rounded w-24 mb-3"></div>
                  <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
                </div>
                <div>
                  <div className="h-5 bg-gray-300 rounded w-28 mb-3"></div>
                  <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
                </div>
              </div>
            </div>

            {/* Expertise Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 p-8 animate-pulse">
              <div className="h-7 bg-gray-300 rounded w-48 mb-6"></div>
              <div className="space-y-4">
                <div>
                  <div className="h-5 bg-gray-300 rounded w-48 mb-3"></div>
                  <div className="h-12 bg-gray-300 rounded-xl w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>

                {/* Skills tags skeleton */}
                <div className="flex flex-wrap gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-300 rounded-xl w-24"></div>
                  ))}
                </div>

                {/* Quick select skeleton */}
                <div>
                  <div className="h-5 bg-gray-300 rounded w-32 mb-3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-8 bg-gray-300 rounded-lg w-20"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="h-12 bg-gray-300 rounded-xl w-full sm:w-32"></div>
              <div className="h-12 bg-gray-300 rounded-xl w-full sm:w-40"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}