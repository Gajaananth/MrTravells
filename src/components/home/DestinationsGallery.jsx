import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Clock, Compass, ArrowUpRight, X } from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';
import { getWhatsAppLink } from '../../lib/config';

export default function DestinationsGallery() {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-white dark:bg-[#051810] relative overflow-hidden transition-colors">
      {/* Glow shapes */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-amber-500/5 dark:bg-ceylon-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-emerald-950/80 border border-amber-300 dark:border-ceylon-gold/30 text-xs font-semibold text-amber-800 dark:text-ceylon-gold uppercase tracking-wider shadow-sm">
              <Compass size={14} />
              <span>Curated Island Highlights</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white tracking-tight">
              Iconic Places to Discover in <br />
              <span className="text-gold-gradient font-serif">Sri Lanka</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base font-normal dark:font-light">
              From the colossal Sigiriya Lion Rock and Ella Nine Arches to coastal Trincomalee, ancient Polonnaruwa, and the misty Ceylon tea hills.
            </p>
          </div>

          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">
            <span>✨ Tap any destination for details & travel times</span>
          </div>
        </div>

        {/* Masonry / Parallax Grid Layout with 8 destinations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 sm:gap-6">
          
          {/* 1. Sigiriya Lion Rock (Large Feature - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setActiveModal(DESTINATIONS[0])}
            className="sm:col-span-2 md:col-span-7 h-[340px] sm:h-[420px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
          >
            <img
              src={DESTINATIONS[0].image}
              alt={DESTINATIONS[0].name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85] group-hover:brightness-95"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-amber-300">
                {DESTINATIONS[0].badge}
              </span>
              <span className="text-xs sm:text-sm font-serif italic text-white/70 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                {DESTINATIONS[0].sinhala}
              </span>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 space-y-1 sm:space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-300">
                <MapPin size={13} />
                <span>{DESTINATIONS[0].region}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-3xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors flex items-center justify-between">
                <span>{DESTINATIONS[0].name}</span>
                <span className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white/10 group-hover:bg-amber-400 dark:group-hover:bg-ceylon-gold group-hover:text-stone-900 flex items-center justify-center text-white transition-all">
                  <ArrowUpRight size={16} />
                </span>
              </h3>
              <p className="text-stone-200 text-xs sm:text-sm line-clamp-2 font-light hidden sm:block">
                {DESTINATIONS[0].description}
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {DESTINATIONS[0].tags.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-sm text-[10px] sm:text-[11px] text-stone-200">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 2. Ella Nine Arches Bridge (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => setActiveModal(DESTINATIONS[1])}
            className="sm:col-span-2 md:col-span-5 h-[340px] sm:h-[420px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
          >
            <img
              src={DESTINATIONS[1].image}
              alt={DESTINATIONS[1].name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85] group-hover:brightness-95"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs font-semibold text-amber-300">
                {DESTINATIONS[1].badge}
              </span>
              <span className="text-xs sm:text-sm font-serif italic text-white/70 px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-sm">
                {DESTINATIONS[1].sinhala}
              </span>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 space-y-1 sm:space-y-2 text-left">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-emerald-300">
                <MapPin size={13} />
                <span>{DESTINATIONS[1].region}</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors flex items-center justify-between">
                <span>{DESTINATIONS[1].name}</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 group-hover:bg-amber-400 dark:group-hover:bg-ceylon-gold group-hover:text-stone-900 flex items-center justify-center text-white transition-all">
                  <ArrowUpRight size={15} />
                </span>
              </h3>
              <p className="text-stone-200 text-xs sm:text-sm line-clamp-2 font-light hidden sm:block">
                {DESTINATIONS[1].description}
              </p>
            </div>
          </motion.div>

          {/* 3. Sacred City of Kandy (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            onClick={() => setActiveModal(DESTINATIONS[2])}
            className="sm:col-span-1 md:col-span-4 h-[280px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
          >
            <img
              src={DESTINATIONS[2].image}
              alt={DESTINATIONS[2].name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300">
                {DESTINATIONS[2].badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 text-left">
              <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                <MapPin size={12} /> {DESTINATIONS[2].region}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors">
                {DESTINATIONS[2].name}
              </h3>
            </div>
          </motion.div>

          {/* 4. Nuwara Eliya Tea Valleys (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setActiveModal(DESTINATIONS[3])}
            className="sm:col-span-1 md:col-span-4 h-[280px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
          >
            <img
              src={DESTINATIONS[3].image}
              alt={DESTINATIONS[3].name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300">
                {DESTINATIONS[3].badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 text-left">
              <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                <MapPin size={12} /> {DESTINATIONS[3].region}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors">
                {DESTINATIONS[3].name}
              </h3>
            </div>
          </motion.div>

          {/* 5. Mirissa & Southern Coast (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            onClick={() => setActiveModal(DESTINATIONS[4])}
            className="sm:col-span-1 md:col-span-4 h-[280px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
          >
            <img
              src={DESTINATIONS[4].image}
              alt={DESTINATIONS[4].name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300">
                {DESTINATIONS[4].badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 text-left">
              <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                <MapPin size={12} /> {DESTINATIONS[4].region}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors">
                {DESTINATIONS[4].name}
              </h3>
            </div>
          </motion.div>

          {/* 6. Batticaloa City (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setActiveModal(DESTINATIONS[5])}
            className="sm:col-span-1 md:col-span-4 h-[280px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
          >
            <img
              src={DESTINATIONS[5].image}
              alt={DESTINATIONS[5].name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300">
                {DESTINATIONS[5].badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 text-left">
              <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                <MapPin size={12} /> {DESTINATIONS[5].region}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors">
                {DESTINATIONS[5].name}
              </h3>
            </div>
          </motion.div>

          {/* 7. Polonnaruwa Ancient City (4 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            onClick={() => setActiveModal(DESTINATIONS[6])}
            className="sm:col-span-1 md:col-span-4 h-[280px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
          >
            <img
              src={DESTINATIONS[6].image}
              alt={DESTINATIONS[6].name}
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="absolute top-4 left-4 z-10">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300">
                {DESTINATIONS[6].badge}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 text-left">
              <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                <MapPin size={12} /> {DESTINATIONS[6].region}
              </div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors">
                {DESTINATIONS[6].name}
              </h3>
            </div>
          </motion.div>

          {/* 8. Trincomalee & Nilaveli Coast (4 cols - NEW) */}
          {DESTINATIONS[7] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => setActiveModal(DESTINATIONS[7])}
              className="sm:col-span-1 md:col-span-4 h-[280px] sm:h-[340px] rounded-2xl sm:rounded-3xl overflow-hidden relative group cursor-pointer border border-stone-200 dark:border-ceylon-gold/25 shadow-xl"
            >
              <img
                src={DESTINATIONS[7].image}
                alt={DESTINATIONS[7].name}
                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-semibold text-amber-300">
                  {DESTINATIONS[7].badge}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-10 space-y-1 text-left">
                <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <MapPin size={12} /> {DESTINATIONS[7].region}
                </div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors">
                  {DESTINATIONS[7].name}
                </h3>
              </div>
            </motion.div>
          )}

        </div>

      </div>

      {/* Destination Detail Lightbox Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="liquid-glass-card rounded-2xl sm:rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-left my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 dark:bg-black/60 text-stone-800 dark:text-white flex items-center justify-center hover:bg-white dark:hover:bg-black/90 transition-colors border border-stone-300 dark:border-white/10 shadow-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="h-52 sm:h-64 md:h-72 relative">
                <img
                  src={activeModal.image}
                  alt={activeModal.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-black/30 dark:from-[#062619]" />
                <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 dark:bg-ceylon-gold text-stone-900 dark:text-ceylon-dark font-bold text-[10px] sm:text-xs">
                    {activeModal.badge}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 dark:text-white mt-1">
                    {activeModal.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-7 space-y-3 sm:space-y-4">
                <p className="text-stone-800 dark:text-stone-300 text-xs sm:text-sm font-normal leading-relaxed">
                  {activeModal.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 py-2 sm:py-3 border-y border-stone-200 dark:border-white/10 text-xs">
                  <div>
                    <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Recommended Best Time:</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                      <Clock size={13} /> {activeModal.bestTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Region:</span>
                    <span className="text-stone-900 dark:text-white font-medium flex items-center gap-1.5">
                      <MapPin size={13} className="text-amber-600 dark:text-ceylon-gold" /> {activeModal.region}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {activeModal.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 text-[10px] sm:text-xs text-stone-700 dark:text-stone-300">
                        {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={getWhatsAppLink(`Hi MR Travels & Tours, I would love to visit ${activeModal.name} on a private day tour. What is the itinerary?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md"
                  >
                    <span>Enquire on WhatsApp</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
