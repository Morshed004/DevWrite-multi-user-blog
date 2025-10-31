export const DashboardSkeleton = ()=> {
  return (
    <>
      {/* Tab Navigation Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-2 mb-8">
        <div className="flex space-x-2">
          <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Search and Filter Bar Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="w-48 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>

      {/* Content Area Skeleton */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/60 p-6">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </>
  );
}