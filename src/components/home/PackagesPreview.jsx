import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, ArrowRight, MessageCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { PACKAGES } from '../../data/packages';
import { getWhatsAppLink } from '../../lib/config';

export default function PackagesPreview({ onOpenEnquiry }) {
  const featuredPackages = PACKAGES.filter(p => p.featured).slice(0, 3);

  return (
    <section id="packages-preview" className="py-16 sm:py-24 bg-white dark:bg-gradient-to-b dark:from-[#051810] dark:via-[#072519] dark:to-[#051810] relative overflow-hidden transition-colors">
      {/* Background glow (dark mode only) */}
      <div className="absolute top-0 right-1/3 w-96 h-96 bg-ceylon-gold/10 rounded-full blur-[130px] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-emerald-950/80 border border-amber-300 dark:border-ceylon-gold/30 text-xs font-semibold text-amber-800 dark:text-ceylon-gold uppercase tracking-wider shadow-sm">
              <Sparkles size={14} />
              <span>Handcrafted Day Tours</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white tracking-tight">
              Featured Private <br />
              <span className="text-gold-gradient font-serif">Single-Car Packages</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base font-normal dark:font-light">
              Tailored for up to 3 guests in a dedicated luxury sedan. All-inclusive upfront LKR pricing covers vehicle, expressway tolls, fuel, chauffeur guide, and schedule freedom.
            </p>
          </div>

          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-700 dark:text-ceylon-gold hover:text-amber-800 dark:hover:text-amber-300 transition-colors group"
          >
            <span>Explore All {PACKAGES.length} Packages</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Packages Cards Grid - Mobile Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPackages.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:glass-card rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between border border-stone-200 dark:border-ceylon-gold/25 relative group shadow-md hover:shadow-xl dark:shadow-2xl transition-all"
            >
              <div>
                {/* Image Header with Price Badge in LKR */}
                <div className="h-48 sm:h-56 relative overflow-hidden">
                  <img
                    src={pkg.heroImage}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-950/85 backdrop-blur-md border border-emerald-500/30 text-[11px] sm:text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Clock size={12} /> {pkg.duration}
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-medium text-stone-200 flex items-center gap-1.5">
                      <Users size={12} /> Up to 3 Guests
                    </span>
                  </div>

                  {/* Price Floating Pill - STRICTLY LKR */}
                  <div className="absolute bottom-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:to-amber-500 text-stone-900 dark:text-ceylon-dark px-3 py-1.5 rounded-xl shadow-lg font-bold text-left">
                    <div className="text-[9px] uppercase tracking-wider font-bold opacity-80">Vehicle Total</div>
                    <div className="text-base sm:text-lg leading-tight font-serif font-extrabold">{pkg.pricing.formatted}</div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 sm:p-6 text-left space-y-3 sm:space-y-4">
                  <div>
                    <span className="text-[10px] sm:text-[11px] text-amber-600 dark:text-ceylon-gold font-bold uppercase tracking-wider">
                      {pkg.tagline}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-ceylon-gold transition-colors mt-0.5">
                      {pkg.title}
                    </h3>
                  </div>

                  <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm font-normal dark:font-light line-clamp-3 leading-relaxed">
                    {pkg.overview}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2 border-t border-stone-100 dark:border-white/10">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider block">Tour Highlights</span>
                    {pkg.highlights.slice(0, 3).map((hl, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-300">
                        <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-6 pt-0 space-y-2 sm:space-y-3">
                {/* Specific WhatsApp Deep Link */}
                <a
                  href={getWhatsAppLink(`Hi MR Travels & Tours, I'm interested in the ${pkg.title} package (${pkg.pricing.formatted}).`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs tracking-wide shadow-md transition-all active:scale-95"
                >
                  <MessageCircle size={16} />
                  <span>Book on WhatsApp ({pkg.pricing.formatted})</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/packages"
                    className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-white hover:bg-stone-50 dark:bg-white/5 dark:hover:bg-white/10 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white text-xs font-semibold transition-colors"
                  >
                    <span>Full Itinerary</span>
                    <ArrowRight size={13} />
                  </Link>

                  <button
                    onClick={() => onOpenEnquiry && onOpenEnquiry(pkg.title)}
                    className="flex items-center justify-center gap-1 py-2.5 rounded-xl bg-white hover:bg-stone-50 dark:bg-amber-500/10 dark:hover:bg-amber-500/20 border border-amber-200 dark:border-ceylon-gold/30 text-amber-800 dark:text-ceylon-gold text-xs font-semibold transition-colors"
                  >
                    <span>Enquire Online</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Multi-day banner */}
        <div className="mt-12 sm:mt-16 bg-white dark:glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-ceylon-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-left shadow-md dark:shadow-2xl">
          <div className="space-y-1 max-w-xl">
            <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white">Need a Customized Multi-Day Tour?</h4>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm font-normal dark:font-light">
              Want to combine Sigiriya Lion Rock, Ella Nine Arches, Nuwara Eliya, Trincomalee, Batticaloa, or Polonnaruwa across multiple days? We can design your exact custom route in LKR.
            </p>
          </div>
          <a
            href={getWhatsAppLink("Hi MR Travels & Tours, I'd like to customize a multi-day tour itinerary in Sri Lanka.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:to-amber-500 text-stone-900 dark:text-ceylon-dark font-bold text-xs uppercase tracking-wider text-center shadow-md hover:shadow-lg transition-all"
          >
            Request Custom Route
          </a>
        </div>

      </div>
    </section>
  );
}
