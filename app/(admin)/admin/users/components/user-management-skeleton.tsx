export default function UserManagementLoading() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-8 w-64 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-500">
                <tr>
                  {[...Array(5)].map((_, i) => (
                    <th key={i} className="px-6 py-3">
                      <div className="h-4 w-20 bg-blue-400 rounded animate-pulse"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...Array(8)].map((_, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-blue-50 transition-colors">
                    {/* User Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                        <div className="ml-4 space-y-2">
                          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                          <div className="h-3 w-24 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Role Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-6 w-16 bg-gray-300 rounded-full animate-pulse"></div>
                    </td>
                    
                    {/* Posts Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-8 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    
                    {/* Joined Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                    
                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-8 w-24 bg-gray-300 rounded animate-pulse"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Skeleton */}
        <div className="mt-4">
          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}