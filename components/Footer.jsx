import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  { label: 'Facebook', href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'X', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image src="/images/uco-logo.jpeg" alt="UCO Logo" width={48} height={48} className="rounded-full" />
            <span className="font-heading font-bold text-lg">UCO</span>
          </div>
          <p className="text-sm text-gray-300">
            The Collective Voice of the Construction & Infrastructure Industry.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-gold mb-3">Membership</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/become-member" className="hover:text-white">Become a Member</Link></li>
            <li><Link href="/contractor-registration" className="hover:text-white">Contractor Registration</Link></li>
            <li><Link href="/corporate-membership" className="hover:text-white">Corporate Membership</Link></li>
            <li><Link href="/login" className="hover:text-white">Member Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-gold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/notifications" className="hover:text-white">Government Notifications</Link></li>
            <li><Link href="/news" className="hover:text-white">News & Media</Link></li>
            <li><Link href="/downloads" className="hover:text-white">Downloads</Link></li>
            <li><Link href="/gallery" className="hover:text-white">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-gold mb-3">National Headquarters</h4>
          <p className="text-sm text-gray-300 leading-relaxed">
            CTG Complex, 14 Institutional Area,<br />
            Lodhi Road, New Delhi &ndash; 110003, India
          </p>
          <p className="text-sm text-gray-300 mt-3">
            info@ucoindia.org<br />
            +91 11 4971 4444
          </p>
        </div>
      </div>

      <div className="container-page pb-6 flex gap-4">
        {socialLinks.map((s) => (
          <a key={s.label} href={s.href} aria-label={s.label} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs">
            {s.label[0]}
          </a>
        ))}
      </div>

      <div className="border-t border-white/10 py-5">
        <div className="container-page flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-300">
          <span>&copy; {new Date().getFullYear()} United Contractors Organisation. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Security &amp; Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
