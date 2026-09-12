import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MessageCircle, ShieldCheck, Star, ArrowRight, MapPin, Award, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG, getWhatsAppLink } from '../../lib/config';

export default function HeroSection() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-[92vh] flex items-center pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 overflow-hidden bg-white dark:bg-[#051810] transition-colors">
      {/* Background: In dark mode only, show atmospheric Ceylon imagery. In light mode: clean pure white! */}
      <div className="absolute inset-0 -z-20 hidden dark:block">
        <img
          src="/images/destinations/sigiriya.jpg"
          alt="Sri Lanka Sigiriya Rock Sunrise"
          className="w-full h-full object-cover object-center brightness-[0.35] contrast-125 transition-transform duration-1000"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#051810] via-[#051810]/75 to-[#051810]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(229,169,60,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(8,51,33,0.4),transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Copy & Value CTAs */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-900 dark:text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              Experience Sri Lanka in <br />
              <span className="text-gold-gradient font-serif">Effortless Comfort</span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base lg:text-lg text-stone-600 dark:text-stone-300 max-w-2xl leading-relaxed font-normal dark:font-light">
              Explore ancient rock fortresses, misty Ceylon tea hills, coastal Trincomalee, and wild elephant safaris with your own dedicated private air-conditioned vehicle and licensed local guide.
            </p>

            {/* Key Trust Highlights Strip */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 py-1 sm:py-2 max-w-xl">
              <div className="p-2.5 sm:p-3 rounded-xl liquid-glass-card text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-0.5 sm:gap-1 text-amber-500 dark:text-ceylon-gold mb-1">
                  <Star size={12} className="fill-current sm:w-3.5 sm:h-3.5" />
                  <Star size={12} className="fill-current sm:w-3.5 sm:h-3.5" />
                  <Star size={12} className="fill-current sm:w-3.5 sm:h-3.5" />
                  <Star size={12} className="fill-current sm:w-3.5 sm:h-3.5" />
                  <Star size={12} className="fill-current sm:w-3.5 sm:h-3.5" />
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-stone-950 dark:text-white leading-tight">5.0 Star Rated</div>
                <div className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-300 font-medium">100+ Happy Guests</div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl liquid-glass-card text-center sm:text-left">
                <div className="text-emerald-800 dark:text-emerald-400 text-xs sm:text-sm font-bold flex items-center justify-center sm:justify-start gap-1 mb-1">
                  <ShieldCheck size={14} className="sm:w-4 sm:h-4" />
                  <span>Licensed</span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-stone-950 dark:text-white leading-tight">Tourist Chauffeur</div>
                <div className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-300 font-medium">12+ Years Experience</div>
              </div>

              <div className="p-2.5 sm:p-3 rounded-xl liquid-glass-card text-center sm:text-left">
                <div className="text-amber-800 dark:text-ceylon-gold text-xs sm:text-sm font-bold flex items-center justify-center sm:justify-start gap-1 mb-1">
                  <Award size={14} className="sm:w-4 sm:h-4" />
                  <span>Honest</span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-stone-950 dark:text-white leading-tight">All-Inclusive LKR</div>
                <div className="text-[10px] sm:text-[11px] text-stone-600 dark:text-stone-300 font-medium">Tolls & Fuel Included</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                to="/packages"
                id="hero-view-packages-cta"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-ceylon-dark bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 dark:from-ceylon-gold dark:via-amber-400 dark:to-amber-500 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>View Tour Packages</span>
                <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
              </Link>

              <a
                href={getWhatsAppLink("Hi MR Travels & Tours! I'm planning a visit to Sri Lanka and would like to ask about day packages.")}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-whatsapp-cta"
                className="inline-flex items-center justify-center gap-3 px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-xs sm:text-sm font-bold text-emerald-900 dark:text-white bg-white hover:bg-stone-50 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 border border-stone-300 dark:border-emerald-500/40 shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle size={18} className="text-[#25D366] sm:w-5 sm:h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Pick-up note */}
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <MapPin size={14} className="text-amber-600 dark:text-ceylon-gold shrink-0" />
              <span>Doorstep pick-up anywhere in Colombo, Negombo, Kandy, or BIA Airport.</span>
            </div>

          </div>

          {/* Right Column: Premium Showcase (No Animation) */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="w-full rounded-3xl overflow-hidden liquid-glass-card relative p-3 sm:p-4 transition-all">
              
              {/* Feature Image with Scenic Sri Lanka & Tour Comfort */}
              <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-inner">
                <img
                  src="/images/destinations/sigiriya.jpg"
                  alt="Sri Lanka Private Tour Experience"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 shadow-md">
                    <CheckCircle2 size={13} /> 100% Private Sedan
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-xs text-stone-200">
                    Up to 3 Guests
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="bg-black/60 backdrop-blur-md border border-white/15 p-3 rounded-xl text-white">
                    <div className="text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Dedicated Hybrid Sedan Chauffeur
                    </div>
                    <div className="text-xs text-stone-300 mt-0.5 font-light">
                      Whisper-quiet dual A/C, spacious luggage boot, and flexible photo stops along scenic Sri Lanka routes.
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Badges Strip */}
              <div className="mt-3 pt-2 grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs">
                <div className="p-2 rounded-xl liquid-glass-card text-stone-800 dark:text-stone-200 font-semibold">
                  ❄️ Dual Climate A/C
                </div>
                <div className="p-2 rounded-xl liquid-glass-card text-stone-800 dark:text-stone-200 font-semibold">
                  📶 Free 4G Wi-Fi
                </div>
                <div className="p-2 rounded-xl liquid-glass-card text-stone-800 dark:text-stone-200 font-semibold">
                  💧 Chilled Water
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
