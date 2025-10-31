export default function AuthSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
        {/* Header Skeleton */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="mt-6 h-8 bg-gray-300 rounded-lg w-3/4 mx-auto animate-pulse"></div>
          <div className="mt-2 h-4 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
        </div>

        <div className="mt-8 space-y-6">
          {/* Error placeholder skeleton */}
          <div className="h-12 bg-gray-100 rounded-lg animate-pulse"></div>

          <div className="space-y-4">
            {/* Email Input Skeleton */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="block w-full pl-10 pr-3 py-3 bg-gray-200 rounded-lg animate-pulse h-12"></div>
              </div>
            </div>

            {/* Password Input Skeleton */}
            <div>
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-2 animate-pulse"></div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="block w-full pl-10 pr-10 py-3 bg-gray-200 rounded-lg animate-pulse h-12"></div>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button Skeleton */}
          <div>
            <div className="w-full py-3 bg-gray-300 rounded-lg animate-pulse h-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}