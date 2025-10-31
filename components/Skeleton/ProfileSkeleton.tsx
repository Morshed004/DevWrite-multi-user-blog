export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Skeleton */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200/50 p-8 mb-8 animate-pulse">
            <div className="flex flex-col lg:flex-row items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar Section Skeleton */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-32 h-32 bg-gray-300 rounded-3xl"></div>
                  <div className="absolute -bottom-2 -right-2 bg-gray-300 border-4 border-white rounded-full p-2 w-10 h-10"></div>
                </div>
              </div>

              {/* User Info Skeleton */}
              <div className="flex-1 space-y-6 w-full">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="h-10 bg-gray-300 rounded-xl w-48"></div>
                      <div className="h-10 bg-gray-300 rounded-xl w-32"></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 flex items-center space-x-3">
                    <div className="text-right">
                      <div className="h-8 bg-gray-300 rounded w-12 mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="text-right">
                      <div className="h-8 bg-gray-300 rounded w-12 mb-1"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                </div>

                {/* Bio Skeleton */}
                <div className="bg-gray-100 border border-gray-200 rounded-2xl p-6">
                  <div className="h-6 bg-gray-300 rounded w-1/4 mb-3"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>

                {/* Contact & Location Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                      <div className="h-5 bg-gray-300 rounded w-32"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-4">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 rounded w-16 mb-2"></div>
                      <div className="h-5 bg-gray-300 rounded w-40"></div>
                    </div>
                  </div>
                </div>

                {/* Skills Skeleton */}
                <div className="space-y-3">
                  <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 bg-gray-300 rounded-xl w-20"></div>
                    ))}
                  </div>
                </div>

                {/* Join Date Skeleton */}
                <div className="flex items-center space-x-2 pt-4 border-t border-gray-200">
                  <div className="w-5 h-5 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Navigation Skeleton */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden mb-8">
            {/* Tab Navigation Skeleton */}
            <div className="border-b border-gray-200/50">
              <nav className="flex">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 px-8 py-4">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <div className="h-6 bg-gray-300 rounded w-24"></div>
                    <div className="h-6 bg-gray-300 rounded w-8"></div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Tab Content Skeleton */}
            <div className="p-8">
              <div className="space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="group bg-gray-50 rounded-2xl p-6 border border-gray-200/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-8 bg-gray-300 rounded-full w-24"></div>
                    </div>
                    
                    <div className="h-7 bg-gray-300 rounded w-3/4 mb-4"></div>
                    <div className="space-y-2 mb-6">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-4 bg-gray-300 rounded w-4"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                      <div className="h-5 bg-gray-300 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions Skeleton */}
          <div className="bg-gray-300 rounded-2xl p-8 text-center animate-pulse">
            <div className="h-8 bg-gray-400 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-5 bg-gray-400 rounded w-1/2 mx-auto mb-6"></div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="h-12 bg-gray-400 rounded-2xl w-40"></div>
              <div className="h-12 bg-gray-400 rounded-2xl w-48"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}