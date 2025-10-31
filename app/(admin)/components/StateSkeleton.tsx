export function StatsSkeleton() {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
      {/* Total Users Stat Skeleton */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 bg-gray-300 rounded w-16"></div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-24 mt-2"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      {/* Total Posts Stat Skeleton */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-20 mb-4"></div>
            <div className="flex items-center space-x-2">
              <div className="h-8 bg-gray-300 rounded w-16"></div>
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <div className="h-3 bg-gray-200 rounded w-24 mt-2"></div>
          </div>
          <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}