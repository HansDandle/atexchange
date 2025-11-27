'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from '@/lib/session-context';
import { logout } from '@/app/actions/auth';

const Header: React.FC = () => {
  const { user, isLoading } = useSession();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <Image src="/atxlogo.png" alt="Austin Talent Exchange" width={40} height={40} className="h-10 w-10" />
            <h1 className="text-xl font-bold text-austin-charcoal">Austin Talent Exchange</h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">
              Dashboard
            </Link>
            <Link href="/venues" className="text-sm text-gray-600 hover:text-austin-orange">
              Venues
            </Link>
            <Link href="/bands" className="text-sm text-gray-600 hover:text-austin-orange">
              Bands
            </Link>
            {!isLoading && user && (
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="text-sm text-gray-600 hover:text-austin-orange bg-none border-none cursor-pointer disabled:opacity-50"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;