'use client';

import { useState, useRef, useEffect } from 'react';
import {
  ChevronDownIcon,
  XMarkIcon,
  UserCircleIcon,
  PencilSquareIcon,
  ChartBarSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

interface HeaderProps {
  user: User | null;
}

export default function Header({ user }: HeaderProps) {
  const [isDesktopProfileOpen, setIsDesktopProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (desktopRef.current && !desktopRef.current.contains(e.target as Node)) {
        setIsDesktopProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setIsMobileProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const navigationItems = [
    { href: '/profile', label: 'Profile', icon: UserCircleIcon },
    { href: '/create-post', label: 'Create Post', icon: PencilSquareIcon },
    ...(user?.isAdmin
      ? [{ href: '/admin', label: 'Admin Dashboard', icon: ChartBarSquareIcon }]
      : []),
  ];

  const handleNavClick = (href: string, type: 'desktop' | 'mobile') => {
    if (type === 'desktop') setIsDesktopProfileOpen(false);
    else setIsMobileProfileOpen(false);
    setTimeout(() => router.push(href), 100);
  };

  const handleLogout = async (type: 'desktop' | 'mobile') => {
    if (type === 'desktop') setIsDesktopProfileOpen(false);
    else setIsMobileProfileOpen(false);
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Logout successful")
          router.refresh();
        },
        onError: ()=>{
          toast.error("Failed to logout")
        }
      }
    });

  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-sm'
          : 'bg-white border-b border-gray-200'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
            <span className="text-white font-bold text-sm">DW</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-br from-gray-900 to-gray-700 bg-clip-text text-transparent hidden sm:block">
            DevWrite
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={desktopRef}>
              <button
                onClick={() =>
                  setIsDesktopProfileOpen((prev) => !prev)
                }
                className="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 border border-transparent hover:border-gray-200"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-sm">
                  {getInitials(user.name)}
                </div>
                <div className="text-left hidden xl:block">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <ChevronDownIcon
                  className={`w-4 h-4 text-gray-500 transition-transform ${isDesktopProfileOpen ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {isDesktopProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-2">
                    {navigationItems.map(({ href, label, icon: Icon }) => (
                      <button
                        key={href}
                        onClick={() => handleNavClick(href, 'desktop')}
                        className="flex items-center w-full space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 text-left"
                      >
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={() => handleLogout('desktop')}
                      className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <XMarkIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/signin"
                className="px-6 py-2.5 text-gray-700 hover:text-gray-900 font-medium rounded-2xl hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-blue-600 text-white rounded-2xl font-medium shadow-md hover:shadow-lg transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Profile (no search/menu icons) */}
        <div className="flex lg:hidden items-center space-x-3">
          {user ? (
            <div className="relative" ref={mobileRef}>
              <button
                onClick={() =>
                  setIsMobileProfileOpen((prev) => !prev)
                }
                className="p-2 rounded-xl hover:bg-gray-100"
              >
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-xs">
                  {getInitials(user.name)}
                </div>
              </button>

              {isMobileProfileOpen && (
                <div
                  className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-3 z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>

                  <div className="py-2 flex flex-col">
                    {navigationItems.map(({ href, label, icon: Icon }) => (
                      <button
                        key={href}
                        onClick={() => handleNavClick(href, 'mobile')}
                        className="flex items-center w-full space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Icon className="w-5 h-5 text-gray-400" />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-2">
                    <button
                      onClick={() => handleLogout('mobile')}
                      className="flex items-center space-x-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <XMarkIcon className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="px-4 py-2 text-gray-700 font-medium rounded-xl hover:bg-gray-50 border border-gray-200"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
