'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { EyeIcon } from '@heroicons/react/24/outline'; 

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [visitorCount, setVisitorCount] = useState(0); // Placeholder for visitor count
  const [todayDate, setTodayDate] = useState('');
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      console.log('isMounted', isMounted.current)
      setVisitorCount((visitorCount) => visitorCount + 1);
    }
    // Set today's date
    setTodayDate(new Date().toLocaleDateString());

    return() => {
      isMounted.current = false;
    }
  }, []);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <div className="mt-4 p-3 text-left flex justify-between">
        <div>
          {todayDate}
        </div>
        <div className="flex items-center">
          <EyeIcon className="w-5 h-5 mr-2" /><span>{visitorCount}</span>
        </div>
      </div>
    </>
  );
}
