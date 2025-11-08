
const Loader = () => {
  return (
    // Centering Container: Uses min-h-screen, flex, and centering utilities
    <div className="flex items-center justify-center min-h-screen w-full bg-gray-50 transition-colors duration-300">
      
      {/* Skeleton Content */}
      <div className="relative flex w-64 animate-pulse gap-4 p-6 bg-white rounded-xl shadow-xl">
        
        {/* User Avatar Placeholder */}
        <div className="h-12 w-12 rounded-full bg-blue-300" /> 
        
        {/* Text Lines Placeholder */}
        <div className="flex-1">
          {/* Top line (slightly longer) */}
          <div className="mb-2 h-5 w-4/5 rounded-lg bg-blue-200" />
          {/* Bottom line (slightly shorter) */}
          <div className="h-5 w-[90%] rounded-lg bg-blue-100" />
        </div>
        
        {/* Extra Badge/Dot Placeholder */}
        {/* Changed positioning from absolute right-0 to top-4 right-4 for better aesthetics */}
        <div className="absolute top-4 right-4 h-3 w-3 rounded-full bg-blue-500" />
      </div>

    </div>
  );
}

export default Loader;