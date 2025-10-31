'use client';

export default function HeaderSkeleton() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between animate-pulse">
        {/* Logo Placeholder */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Search Placeholder */}
        <div className="hidden md:block flex-1 max-w-lg mx-8">
          <div className="w-full h-9 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Auth Section Placeholder */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="w-24 h-8 bg-gray-200 rounded"></div>
          <div className="w-24 h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    </header>
  );
}
