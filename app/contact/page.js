import PageHero from '@/components/PageHero';

export const metadata = { title: 'Contact Us | UCO' };

export default function Contact() {
  return (
    <div>
      <PageHero eyebrow="Get In Touch" title="Contact Us" />
      <section className="container-page py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading font-bold text-xl text-navy mb-4">National Headquarters</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            CTG Complex, 14 Institutional Area,<br />
            Lodhi Road, New Delhi &ndash; 110003, India
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> info@ucoindia.org<br />
            <strong>Phone:</strong> +91 11 4971 4444<br />
            <strong>Website:</strong> www.ucoindia.org
          </p>
        </div>
        <form className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          <div className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Name</label>
              <input required className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Email</label>
              <input required type="email" className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1">Message</label>
              <textarea required rows={5} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold" />
            </div>
            <button type="submit" className="btn-primary">Send Message</button>
          </div>
        </form>
      </section>
    </div>
  );
}
