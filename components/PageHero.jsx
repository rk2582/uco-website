export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="bg-navy text-white py-16">
      <div className="container-page">
        {eyebrow && <p className="section-label mb-2">{eyebrow}</p>}
        <h1 className="font-heading font-bold text-3xl sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 text-gray-300 max-w-2xl">{subtitle}</p>}
      </div>
    </section>
  );
}
