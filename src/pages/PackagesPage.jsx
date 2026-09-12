import React, { useState, useEffect } from 'react';
import { Compass, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PACKAGES } from '../data/packages';
import PackageCard from '../components/packages/PackageCard';
import PackageEnquiryModal from '../components/packages/PackageEnquiryModal';
import { getWhatsAppLink } from '../lib/config';

export default function PackagesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeEnquiryPkg, setActiveEnquiryPkg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', label: 'All Day Packages' },
    { id: 'cultural', label: 'Cultural & Ancient' },
    { id: 'highland', label: 'Highlands & Ella' },
    { id: 'coastal', label: 'Coastal & Beaches' },
    { id: 'east', label: 'Trincomalee & East Coast' },
    { id: 'wildlife', label: 'Wildlife & Safari' }
  ];

  const filteredPackages = PACKAGES.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'cultural') return pkg.id.includes('sigiriya') || pkg.id.includes('polonnaruwa');
    if (selectedCategory === 'highland') return pkg.id.includes('ella') || pkg.id.includes('tea');
    if (selectedCategory === 'coastal') return pkg.id.includes('galle') || pkg.id.includes('coast') || pkg.id.includes('trincomalee');
    if (selectedCategory === 'east') return pkg.id.includes('trincomalee') || pkg.id.includes('batticaloa');
    if (selectedCategory === 'wildlife') return pkg.id.includes('safari') || pkg.id.includes('udawalawe');
    return true;
  });

  return (
    <main className="w-full pt-20 sm:pt-28 pb-16 sm:pb-24 min-h-screen bg-white dark:bg-[#051810] transition-colors">
      {/* Top Banner Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="text-left space-y-3 sm:space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-ceylon-gold hover:text-amber-800 dark:hover:text-amber-300 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-emerald-950/80 border border-amber-300 dark:border-ceylon-gold/30 text-xs font-semibold text-amber-800 dark:text-ceylon-gold uppercase tracking-wider shadow-sm">
                <Compass size={14} />
                <span>Single-Car Private Tours</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                Sri Lanka Private <span className="text-gold-gradient font-serif">Day Packages</span>
              </h1>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base font-normal dark:font-light leading-relaxed">
                Every tour is 100% private in a dedicated luxury hybrid sedan with your own licensed guide. Upfront vehicle pricing in Sri Lankan Rupees (LKR) covers up to 3 passengers, tolls, fuel, and chauffeur expenses.
              </p>
            </div>

            {/* Vehicle Guarantee Pill */}
            <div className="bg-white dark:glass-card p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-stone-200 dark:border-white/10 flex items-center gap-3 text-left shrink-0 shadow-sm">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-ceylon-gold/20 border border-amber-300 dark:border-transparent flex items-center justify-center text-amber-700 dark:text-ceylon-gold shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div className="text-xs">
                <div className="text-stone-900 dark:text-white font-bold">1 Dedicated Sedan Only</div>
                <div className="text-stone-500 dark:text-stone-400">Exclusive VIP pacing, no sharing</div>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-4 border-t border-stone-200 dark:border-white/10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 dark:bg-ceylon-gold text-stone-900 dark:text-ceylon-dark shadow-sm font-bold'
                    : 'bg-white dark:bg-white/5 hover:bg-stone-50 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Packages List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-10">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onEnquire={(selected) => setActiveEnquiryPkg(selected)}
          />
        ))}
      </div>

      {/* Custom Itinerary Callout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        <div className="bg-white dark:glass-card p-6 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-ceylon-gold/30 text-center relative overflow-hidden shadow-md dark:shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2 sm:mb-3">
            Want to build your own custom Sri Lanka road trip?
          </h2>
          <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-xl mx-auto mb-5 sm:mb-6 font-normal dark:font-light">
            We regularly plan custom multi-day round-island routes connecting Sigiriya Lion Rock, Ella Nine Arches, Polonnaruwa, Trincomalee, Batticaloa, Nuwara Eliya, and Mirissa.
          </p>
          <a
            href={getWhatsAppLink("Hi MR Travels & Tours, I'd like to plan a custom multi-day tour itinerary in Sri Lanka.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all"
          >
            <span>Discuss Custom Route on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Package Enquiry Modal */}
      {activeEnquiryPkg && (
        <PackageEnquiryModal
          pkg={activeEnquiryPkg}
          onClose={() => setActiveEnquiryPkg(null)}
        />
      )}
    </main>
  );
}
