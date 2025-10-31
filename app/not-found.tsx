"use client"
import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-gray-900 opacity-10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-bold bg-blue-600 bg-clip-text text-transparent">
              404
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Oops! The page you&apos;re looking for seems to have wandered off into the digital void. 
            Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold select-none hover:bg-blue-700 transition-all duration-300 hover:shadow-lg group"
            >
              <HomeIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}