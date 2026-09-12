import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Send,
  Sparkles,
  MapPin
} from 'lucide-react';
import { getWhatsAppLink } from '../../lib/config';

export default function PackageCard({ pkg, onEnquire }) {
  const [activeImage, setActiveImage] = useState(pkg.heroImage);
  const [activeTab, setActiveTab] = useState('itinerary');

  const packageWhatsAppLink = getWhatsAppLink(`Hi MR Travels & Tours, I'm interested in the ${pkg.title} package (${pkg.pricing.formatted}).`);

  return (
    <motion.article
      id={pkg.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-[#07251a]/80 rounded-2xl sm:rounded-3xl overflow-hidden border border-stone-200 dark:border-ceylon-gold/25 shadow-xl relative text-left group flex flex-col lg:flex-row transition-colors"
    >
      {/* Left Column: Image Gallery & Visuals */}
      <div className="lg:w-5/12 flex flex-col justify-between p-3.5 sm:p-6 bg-white dark:bg-black/20 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-white/10">
        <div>
          {/* Main Selected Image */}
          <div className="h-56 sm:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-lg">
            <img
              src={activeImage}
              alt={pkg.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Top Badges */}
            <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between">
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 text-[11px] sm:text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <Clock size={12} /> {pkg.duration}
              </span>
              <span className="px-2.5 sm:px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[11px] sm:text-xs text-stone-200 flex items-center gap-1.5">
                <Users size={12} /> {pkg.pricing.type}
              </span>
            </div>

            {/* Bottom Price in LKR ONLY */}
            <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-end justify-between">
              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-2.5 sm:px-3 py-1 rounded-xl text-stone-300 text-xs">
                <span>🇱🇰 Sri Lanka Tour</span>
              </div>

              <div className="bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:to-amber-500 text-stone-900 dark:text-ceylon-dark px-3 sm:px-4 py-1.5 rounded-xl shadow-lg font-bold text-right">
                <div className="text-[9px] uppercase font-bold opacity-90">Vehicle Total</div>
                <div className="text-base sm:text-xl font-serif font-extrabold leading-tight">{pkg.pricing.formatted}</div>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          {pkg.gallery && pkg.gallery.length > 0 && (
            <div className="flex gap-2 mt-2.5 sm:mt-3 overflow-x-auto pb-1">
              {[pkg.heroImage, ...pkg.gallery].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-12 sm:w-16 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImage === img ? 'border-amber-500 dark:border-ceylon-gold scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons for Mobile/Desktop */}
        <div className="pt-3 sm:pt-4 space-y-2">
          <a
            href={packageWhatsAppLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-98"
          >
            <MessageCircle size={16} />
            <span>Book on WhatsApp ({pkg.pricing.formatted})</span>
          </a>

          <button
            onClick={() => onEnquire && onEnquire(pkg)}
            className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 rounded-xl bg-white hover:bg-stone-50 dark:bg-white/5 dark:hover:bg-white/10 border border-amber-300 dark:border-ceylon-gold/30 text-amber-800 dark:text-ceylon-gold text-xs font-bold uppercase tracking-wider transition-all"
          >
            <Send size={13} />
            <span>Send Online Inquiry</span>
          </button>
        </div>
      </div>

      {/* Right Column: Detailed Itinerary & Details */}
      <div className="lg:w-7/12 p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
        <div>
          {/* Title Header */}
          <div className="mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs text-amber-700 dark:text-ceylon-gold font-bold uppercase tracking-widest block mb-0.5">
              {pkg.tagline}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-ceylon-gold transition-colors">
              {pkg.title}
            </h3>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm font-normal dark:font-light mt-1.5 leading-relaxed">
              {pkg.overview}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-stone-200 dark:border-white/10 mb-4 sm:mb-5 gap-4 sm:gap-6 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`pb-2 transition-all relative ${
                activeTab === 'itinerary'
                  ? 'text-amber-700 dark:text-ceylon-gold border-b-2 border-amber-600 dark:border-ceylon-gold font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              Day Schedule & Highlights
            </button>
            <button
              onClick={() => setActiveTab('inclusions')}
              className={`pb-2 transition-all relative ${
                activeTab === 'inclusions'
                  ? 'text-amber-700 dark:text-ceylon-gold border-b-2 border-amber-600 dark:border-ceylon-gold font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              What's Included & Excluded
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'itinerary' ? (
            <div className="space-y-3.5 text-xs">
              {/* Timeline Items */}
              <div className="space-y-2.5 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-amber-200 dark:before:bg-white/10">
                {pkg.schedule.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 pl-0.5 relative">
                    <span className="w-5 h-5 rounded-full bg-white dark:bg-emerald-950 border border-amber-400 dark:border-ceylon-gold/50 flex items-center justify-center text-[10px] text-amber-800 dark:text-ceylon-gold font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <span className="font-bold text-amber-700 dark:text-amber-300 text-[10px] sm:text-[11px]">{item.time}</span>
                        <span className="text-stone-900 dark:text-white font-semibold text-xs">{item.title}</span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px] sm:text-xs mt-0.5 font-normal dark:font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Key Bullet Highlights */}
              <div className="mt-3 pt-3 border-t border-stone-200 dark:border-white/10">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-1.5">
                  Special Experience Highlights:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {pkg.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300 text-[11px] sm:text-xs">
                      <Sparkles size={12} className="text-amber-600 dark:text-ceylon-gold shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-xs">
              {/* Inclusions */}
              <div>
                <h4 className="text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={14} />
                  <span>100% Included in Price ({pkg.pricing.formatted}):</span>
                </h4>
                <ul className="space-y-1.5">
                  {pkg.included.map((inc, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-stone-700 dark:text-stone-300 text-[11px] sm:text-xs">
                      <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="pt-2.5 border-t border-stone-200 dark:border-white/10">
                <h4 className="text-stone-600 dark:text-stone-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <XCircle size={14} className="text-stone-400 dark:text-stone-500" />
                  <span>Excluded (Direct Site Payments):</span>
                </h4>
                <ul className="space-y-1">
                  {pkg.excluded.map((exc, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-stone-500 dark:text-stone-400 text-[11px] sm:text-xs">
                      <span className="text-stone-400 dark:text-stone-600 font-bold">•</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-4 mt-4 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1">
            <MapPin size={12} className="text-amber-600 dark:text-ceylon-gold" /> Pick-up anywhere in Colombo, Negombo, Kandy or Galle
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold hidden sm:inline">Flexible timing</span>
        </div>
      </div>
    </motion.article>
  );
}
