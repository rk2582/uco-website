import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const links = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/reports', label: 'Reports' },
  { href: '/admin/members', label: 'Members' },
  { href: '/admin/payments', label: 'Payments' },
  { href: '/admin/nec', label: 'NEC' },
  { href: '/admin/chapters', label: 'State Chapters' },
  { href: '/admin/posts', label: 'News / Notifications / Training / Conference' },
  { href: '/admin/downloads', label: 'Downloads' },
  { href: '/admin/gallery', label: 'Gallery' },
  { href: '/admin/support-requests', label: 'Support Requests' },
];

export default async function AdminLayout({ children }) {
  const session = await getServerSession();

  // Guard: only signed-in members with isAdmin=true may access /admin/*
  if (!session || !session.user?.isAdmin) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-[calc(100vh-160px)]">
      <aside className="w-64 bg-navy text-white shrink-0 py-8 px-4 hidden md:block">
        <p className="font-heading font-bold text-gold text-sm uppercase tracking-wide mb-6 px-2">
          UCO Admin
        </p>
        <nav className="space-y-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block px-3 py-2 rounded text-sm text-gray-200 hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex-1 bg-gray-50 p-6 md:p-10">{children}</div>
    </div>
  );
}
