import React from 'react';

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  author: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      'Luminex has redefined our expectations for legal document handling. Their chain of custody protocols are unmatched in the West African market.',
    author: 'Kofi Mensah',
    title: 'Senior Partner, Global Legal Chambers',
  },
  {
    id: 2,
    rating: 5,
    quote:
      'The real-time GPS telemetry provides the transparency our compliance department requires for high-value government tenders.',
    author: 'Ama Boateng',
    title: 'Director of Operations, National Infrastructure Agency',
  },
  {
    id: 3,
    rating: 5,
    quote:
      'Speed is essential, but security is non-negotiable. Luminex delivers both with a level of professionalism that is truly world-class.',
    author: 'Dr. Samuel Osei',
    title: 'Chief Technology Officer, Zenith Financial Group',
  },
];

export default function Testimonials() {
  return (
    <section id="operations" className="bg-slate-50 py-16 md:py-24 border-t border-slate-100">
      {/* Both header & grid sit inside this single max-w container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            {/* Vertical Red Accent Bar */}
            <div className="w-1.5 h-8 bg-brand-red-500 rounded-full shrink-0" />
            <h2 className="text-3xl md:text-4xl font-black text-navy-900">
              Trust from Ghana&apos;s Leading Institutions
            </h2>
          </div>
          <p className="text-slate-500 max-w-2xl pl-4.5 text-base">
            Our commitment to security and precision has made us the preferred
            logistics partner for the nation&apos;s most demanding sectors.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-brand-red-500 mb-4" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, index) => (
                    <span key={index} className="text-lg">
                      ★
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <p className="italic text-slate-600 text-sm leading-relaxed mb-6">
                  &quot;{item.quote}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div>
                <h3 className="font-bold text-navy-900">{item.author}</h3>
                <p className="text-xs text-slate-400 italic mt-0.5">{item.title}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}