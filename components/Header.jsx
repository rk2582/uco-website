'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navGroups = [
  {
    label: 'About',
    href: '/about',
    items: [
      { label: 'About UCO', href: '/about' },
      { label: 'Vision & Mission', href: '/vision-mission' },
      { label: 'National Executive Committee', href: '/nec' },
      { label: 'State / Regional Chapters', href: '/chapters' },
    ],
  },
  {
    label: 'Membership',
    href: '/become-member',
    items: [
      { label: 'Become a Member', href: '/become-member' },
      { label: 'Contractor Registration', href: '/contractor-registration' },
      { label: 'Corporate Membership', href: '/corporate-membership' },
    ],
  },
  {
    label: 'Support Services',
    href: '/tendering-support',
    items: [
      { label: 'Tendering Support', href: '/tendering-support' },
      { label: 'JV / Sub-contracting Support', href: '/jv-subcontracting' },
      { label: 'Legal Support', href: '/legal-support' },
      { label: 'Government Notifications', href: '/notifications' },
    ],
  },
  {
    label: "What's On",
    href: '/news',
    items: [
      { label: 'News & Media', href: '/news' },
      { label: 'Training & Workshops', href: '/training' },
      { label: 'Annual Conference', href: '/conference' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Downloads', href: '/downloads' },
    ],
  },
];

export default function Header() {
  const [openGroup, setOpenGroup] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      {/* Main nav — single white bar, no utility strip, matching reference */}
      <div className="container-page flex items-center justify-between h-20 gap-6">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src="/images/uco-logo.jpeg" alt="UCO Logo" width={52} height={52} className="rounded-full" />
          <div className="leading-tight">
            <div className="font-heading font-bold text-navy text-lg">UCO</div>
            <div className="text-[10px] text-gold font-semibold tracking-wide">UNITED CONTRACTORS ORGANISATION</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <Link
                href={group.href}
                className="px-4 py-2 font-heading font-medium text-navy hover:text-gold flex items-center gap-1 text-[15px]"
              >
                {group.label}
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5"/></svg>
              </Link>
              {openGroup === group.label && (
                <div className="absolute top-full left-0 bg-white shadow-xl w-64 py-2 border-t-2 border-gold">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-navy hover:bg-panel hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <Link href="/donate" className="btn-primary text-sm !py-2.5">Donate / Sponsor</Link>
          <Link href="/login" className="font-heading font-medium text-navy text-sm hover:text-gold">Login</Link>
        </div>

        <button className="lg:hidden text-navy" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white max-h-[70vh] overflow-y-auto">
          {navGroups.map((group) => (
            <div key={group.label} className="border-b border-gray-100">
              <div className="px-4 py-3 font-heading font-semibold text-navy">{group.label}</div>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-8 py-2 text-sm text-gray-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/donate" className="block px-4 py-3 font-heading font-semibold text-gold">Donate / Sponsor / CSR</Link>
          <Link href="/login" className="block px-4 py-3 font-heading font-medium text-navy border-t border-gray-100">Member Login</Link>
          <Link href="/contact" className="block px-4 py-3 font-heading font-medium text-navy">Contact Us</Link>
        </div>
      )}
    </header>
  );
}
