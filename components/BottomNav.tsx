'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          <Link
            href="/"
            className={cn(
              'flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors',
              pathname === '/'
                ? 'text-green-600'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Home className="w-6 h-6 mb-1" />
            <span>Home</span>
          </Link>
          <Link
            href="/events"
            className={cn(
              'flex flex-col items-center justify-center w-full h-full text-sm font-medium transition-colors',
              pathname.startsWith('/events')
                ? 'text-green-600'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Calendar className="w-6 h-6 mb-1" />
            <span>Events</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 