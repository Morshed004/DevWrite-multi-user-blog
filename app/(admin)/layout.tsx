import Loader from "@/components/Loader";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div>
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-xl border-b border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <Link
              href="/admin"
              className="flex items-center space-x-3 group"
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Admin Panel
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-1">
              <Link
                href="/admin/users"
                className="relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span>Users</span>
                <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-white/0 group-hover:bg-white/50 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
              </Link>

              <Link
                href="/admin/posts"
                className="relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span>Posts</span>
                <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-white/0 group-hover:bg-white/50 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
              </Link>

              {/* Divider */}
              <div className="w-px h-6 bg-white/20 mx-2"></div>

              <Link
                href="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group border border-white/20 hover:border-white/40"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                <span>Back to Site</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Suspense fallback={<Loader />}>
       {children}
      </Suspense>
    </div>
  );
}