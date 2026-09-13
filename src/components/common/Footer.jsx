import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Phone, Mail, MapPin, ShieldCheck, MessageCircle } from 'lucide-react';
import { APP_CONFIG, getWhatsAppLink } from '../../lib/config';

export default function Footer() {
  return (
    <footer className="relative bg-white dark:bg-[#030e09] border-t border-stone-200 dark:border-ceylon-gold/15 text-stone-600 dark:text-stone-300 pt-12 sm:pt-16 pb-10 sm:pb-12 overflow-hidden text-left transition-colors">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 dark:bg-ceylon-emerald/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/5 dark:bg-ceylon-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-stone-200 dark:border-white/10">
          
          {/* Column 1: Brand & Service summary */}
          <div className="space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 dark:from-ceylon-gold dark:to-amber-600 flex items-center justify-center text-white dark:text-ceylon-dark shadow-md">
                <Compass size={22} className="stroke-[2.5]" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white">MR Travels & Tours</h3>
                <p className="text-[10px] text-amber-700 dark:text-ceylon-gold tracking-widest uppercase font-semibold">Sri Lanka Private Tours</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
              Personalized, one-on-one private car journeys across Sri Lanka. Travel in air-conditioned comfort with flexible stops, authentic experiences, and zero tourist rush.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400 bg-white dark:bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-300 dark:border-emerald-500/20 shadow-sm">
              <ShieldCheck size={18} className="shrink-0 text-amber-600 dark:text-ceylon-gold" />
              <span>Certified Tourist Driver • License {APP_CONFIG.licenseNumber}</span>
            </div>
          </div>

          {/* Column 2: Popular Day Tours */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-ceylon-gold" />
              Popular Day Tours
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-600 dark:text-stone-400">
              <li>
                <Link to="/packages" className="hover:text-amber-700 dark:hover:text-ceylon-gold transition-colors flex items-center justify-between group">
                  <span>Sigiriya Lion Rock & Dambulla</span>
                  <span className="text-xs text-stone-500 group-hover:text-amber-700 dark:group-hover:text-ceylon-gold">View Tour</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-amber-700 dark:hover:text-ceylon-gold transition-colors flex items-center justify-between group">
                  <span>Kandy, Tea Country & Waterfalls</span>
                  <span className="text-xs text-stone-500 group-hover:text-amber-700 dark:group-hover:text-ceylon-gold">View Tour</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-amber-700 dark:hover:text-ceylon-gold transition-colors flex items-center justify-between group">
                  <span>Trincomalee & Nilaveli Coast</span>
                  <span className="text-xs text-stone-500 group-hover:text-amber-700 dark:group-hover:text-ceylon-gold">View Tour</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-amber-700 dark:hover:text-ceylon-gold transition-colors flex items-center justify-between group">
                  <span>Galle Dutch Fort & Coast</span>
                  <span className="text-xs text-stone-500 group-hover:text-amber-700 dark:group-hover:text-ceylon-gold">View Tour</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-amber-700 dark:hover:text-ceylon-gold transition-colors flex items-center justify-between group">
                  <span>Ella Nine Arches Bridge</span>
                  <span className="text-xs text-stone-500 group-hover:text-amber-700 dark:group-hover:text-ceylon-gold">View Tour</span>
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-amber-700 dark:hover:text-ceylon-gold transition-colors flex items-center justify-between group">
                  <span>Udawalawe Wildlife Safari</span>
                  <span className="text-xs text-stone-500 group-hover:text-amber-700 dark:group-hover:text-ceylon-gold">View Tour</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Direct Booking */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-ceylon-gold" />
              Direct Contacts
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 text-stone-600 dark:text-stone-400">
                <MapPin size={16} className="text-amber-600 dark:text-ceylon-gold shrink-0 mt-0.5" />
                <span>Doorstep pick-up: Colombo, Negombo, Kandy, Galle, BIA Airport & Islandwide</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-600 dark:text-stone-400">
                <Phone size={16} className="text-amber-600 dark:text-ceylon-gold shrink-0" />
                <a href={`tel:${APP_CONFIG.phone.replace(/\s+/g, '')}`} className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  {APP_CONFIG.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5 text-stone-600 dark:text-stone-400">
                <Mail size={16} className="text-amber-600 dark:text-ceylon-gold shrink-0" />
                <a href={`mailto:${APP_CONFIG.email}`} className="hover:text-stone-900 dark:hover:text-white transition-colors">
                  {APP_CONFIG.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-semibold text-xs shadow-md hover:brightness-105 transition-all"
                >
                  <MessageCircle size={15} />
                  <span>Instant WhatsApp Booking</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Private Vehicle & Island Base */}
          <div>
            <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-ceylon-gold" />
              Vehicle Fleet
            </h4>
            <div className="bg-white dark:glass-card border border-stone-200 dark:border-white/10 p-3.5 sm:p-4 rounded-xl space-y-2 text-xs text-stone-700 dark:text-stone-300">
              <div className="flex items-center gap-2 text-amber-700 dark:text-ceylon-gold font-semibold">
                <span>🚗 🚐 🚌</span>
                <span>Cars · Vans · Buses</span>
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-[11px] sm:text-xs">
                Private air-conditioned sedans (up to 4 pax), spacious passenger vans (up to 10 pax), and tour coaches (10+ pax). Free chilled mineral water and dedicated chauffeur guide.
              </p>
              <div className="pt-2 border-t border-stone-200 dark:border-white/10 flex items-center justify-between text-stone-500 dark:text-stone-400 text-[11px]">
                <span>Sri Lanka Islandwide</span>
                <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Available 365 Days
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Developer Attribution & Copyright Section */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-stone-500 dark:text-stone-400 text-center sm:text-left">
          <div>
            <p className="font-medium text-stone-700 dark:text-stone-300">
              © {new Date().getFullYear()} MR Travels & Tours. All rights reserved.
            </p>
            <p className="text-amber-700 dark:text-ceylon-gold/90 font-medium text-[11px] mt-0.5">
              Developed by Tradiq Zium Techs. Rights for MR Travels & Tours.
            </p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <Link to="/" className="hover:text-stone-900 dark:hover:text-stone-200">Home</Link>
            <Link to="/packages" className="hover:text-stone-900 dark:hover:text-stone-200">Packages</Link>
            <a href="#destinations" className="hover:text-stone-900 dark:hover:text-stone-200">Destinations</a>
            <a href="#reviews" className="hover:text-stone-900 dark:hover:text-stone-200">Reviews</a>
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
