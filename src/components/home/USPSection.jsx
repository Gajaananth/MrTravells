import React from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, Compass, ShieldCheck, HeartHandshake, Coffee } from 'lucide-react';
import { APP_CONFIG } from '../../lib/config';

export default function USPSection() {
  const features = [
    {
      icon: Car,
      title: "100% Private Luxury Sedan",
      desc: "No sharing with strangers or waiting on big 40-person tour coaches. Your own modern, spotlessly clean Toyota sedan with panoramic views and whisper-quiet A/C.",
      highlight: "Exclusive to Your Group"
    },
    {
      icon: Clock,
      title: "Complete Itinerary Freedom",
      desc: "Spot an unexpected wild peacock or elephant? Want 30 more minutes enjoying a viewpoint? We move at your pace with zero rigid schedules.",
      highlight: "Flexible Pacing"
    },
    {
      icon: Compass,
      title: "Licensed Local Chauffeur Guide",
      desc: `Certified by Sri Lanka Tourism (${APP_CONFIG.licenseNumber}), with 12+ years of insider knowledge, secret scenic lookouts, and authentic local food spots.`,
      highlight: "12+ Years Experience"
    },
    {
      icon: ShieldCheck,
      title: "All-Inclusive & Honest Pricing (LKR)",
      desc: "Expressway tolls, fuel, vehicle parking fees, and driver expenses are 100% included in the upfront LKR quote. No surprise charges at the end of the day.",
      highlight: "Zero Hidden Costs"
    },
    {
      icon: Coffee,
      title: "Doorstep VIP Pick-up",
      desc: "Start fresh right from your hotel lobby or airport arrivals in Colombo, Negombo, Kandy, or Galle. We handle all luggage with utmost care.",
      highlight: "Door-to-Door Service"
    },
    {
      icon: HeartHandshake,
      title: "Authentic Cultural Warmth",
      desc: "True Sri Lankan hospitality (Ayubowan). Chilled mineral water, tropical travel tips, and honest recommendations tailored specifically to your interests.",
      highlight: "Personal Care"
    }
  ];

  return (
    <section id="usp" className="py-14 sm:py-20 bg-white dark:bg-gradient-to-b dark:from-[#051810] dark:via-[#072418] dark:to-[#051810] relative overflow-hidden transition-colors">
      {/* Background accents (dark mode only) */}
      <div className="absolute top-1/2 -left-40 w-80 h-80 bg-ceylon-gold/5 rounded-full blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-emerald-950/80 border border-amber-300 dark:border-ceylon-gold/30 text-xs font-semibold text-amber-800 dark:text-ceylon-gold uppercase tracking-wider shadow-sm">
            Why Travel With Us
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white tracking-tight">
            The Personal Touch of a <br />
            <span className="text-gold-gradient font-serif">Dedicated Private Chauffeur</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base font-normal dark:font-light">
            Skip the stress of self-driving unfamiliar roads or negotiating taxis. Here is why discerning travelers choose MR Travels & Tours:
          </p>
        </div>

        {/* Features Grid - Mobile optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="liquid-glass-card p-5 sm:p-7 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
              >
                {/* Subtle top indicator */}
                <div className="absolute top-0 left-6 right-6 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/50 dark:via-ceylon-gold/40 to-transparent" />

                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-100/80 dark:bg-ceylon-gold/20 border border-amber-300 dark:border-ceylon-gold/30 flex items-center justify-center text-amber-800 dark:text-ceylon-gold shadow-sm group-hover:scale-110 transition-transform">
                      <Icon size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 bg-emerald-100/90 dark:bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-400/60 dark:border-emerald-500/20 shadow-sm">
                      {item.highlight}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-950 dark:text-white mb-2 group-hover:text-amber-700 dark:group-hover:text-ceylon-gold transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-stone-200/80 dark:border-white/10 flex items-center text-[11px] sm:text-xs text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-200">
                  <span>Included with every day booking</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
