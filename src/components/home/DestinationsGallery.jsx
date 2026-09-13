import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Sparkles,
  Clock,
  Compass,
  ArrowUpRight,
  X,
  Camera,
  Star,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Search,
  CheckCircle2,
  UploadCloud
} from 'lucide-react';
import { DESTINATIONS } from '../../data/destinations';
import { fetchApprovedReviews } from '../../lib/supabaseClient';
import { getWhatsAppLink } from '../../lib/config';
import ReviewModal from './ReviewModal';

export default function DestinationsGallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // 1. Fetch approved reviews that have images attached
  useEffect(() => {
    async function loadReviewPhotos() {
      try {
        const reviews = await fetchApprovedReviews();
        const withImages = (reviews || [])
          .filter((r) => r.image_url && r.image_url.trim() !== '')
          .map((r) => ({
            id: `review-${r.id}`,
            isReview: true,
            title: r.package_name || 'Sri Lanka Private Tour',
            customer_name: r.customer_name,
            rating: Number(r.rating) || 5,
            comment: r.comment,
            image: r.image_url,
            category: 'reviews',
            badge: `Guest Review ⭐ ${r.rating || 5}.0`,
            created_at: r.created_at
          }));
        setReviewPhotos(withImages);
      } catch (err) {
        console.warn('Failed to load review photos for gallery:', err);
      }
    }

    loadReviewPhotos();

    // Listen for real-time reviews submitted by user in the current session
    const handleNewReview = (e) => {
      const newRev = e.detail;
      if (newRev && newRev.image_url) {
        const formatted = {
          id: `review-${newRev.id || Date.now()}`,
          isReview: true,
          title: newRev.package_name || 'Sri Lanka Private Tour',
          customer_name: newRev.customer_name,
          rating: Number(newRev.rating) || 5,
          comment: newRev.comment,
          image: newRev.image_url,
          category: 'reviews',
          badge: `Guest Review ⭐ ${newRev.rating || 5}.0`,
          created_at: newRev.created_at || new Date().toISOString()
        };
        setReviewPhotos((prev) => [formatted, ...prev]);
      }
    };

    window.addEventListener('new-review-added', handleNewReview);
    return () => window.removeEventListener('new-review-added', handleNewReview);
  }, []);

  // 2. Combine all destination photos and customer review photos
  const combinedGalleryItems = useMemo(() => {
    const destItems = DESTINATIONS.map((d) => ({
      id: `dest-${d.id}`,
      isReview: false,
      title: d.name,
      region: d.region,
      category: d.category || 'cultural',
      badge: d.badge,
      description: d.description,
      image: d.image,
      tags: d.tags,
      bestTime: d.bestTime
    }));

    return [...destItems, ...reviewPhotos];
  }, [reviewPhotos]);

  // 3. Filter gallery items based on active category & search
  const filteredItems = useMemo(() => {
    return combinedGalleryItems.filter((item) => {
      // Category filter
      if (selectedCategory === 'destinations' && item.isReview) return false;
      if (selectedCategory === 'reviews' && !item.isReview) return false;
      if (
        selectedCategory !== 'all' &&
        selectedCategory !== 'destinations' &&
        selectedCategory !== 'reviews'
      ) {
        if (item.category !== selectedCategory) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchRegion = item.region?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchTags = item.tags?.some((t) => t.toLowerCase().includes(q));
        const matchCustomer = item.customer_name?.toLowerCase().includes(q);
        return matchTitle || matchRegion || matchDesc || matchTags || matchCustomer;
      }

      return true;
    });
  }, [combinedGalleryItems, selectedCategory, searchQuery]);

  // 4. Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const categories = [
    { id: 'all', label: 'All Photos & Places' },
    { id: 'destinations', label: `Destinations (${DESTINATIONS.length})` },
    { id: 'reviews', label: `Guest Reviews (${reviewPhotos.length})` },
    { id: 'cultural', label: 'Cultural & Ancient' },
    { id: 'highlands', label: 'Highlands & Hills' },
    { id: 'coastal', label: 'Beaches & Coastal' },
    { id: 'wildlife', label: 'Wildlife & Safari' }
  ];

  return (
    <section
      id="destinations"
      className="py-16 sm:py-24 bg-white dark:bg-[#051810] relative overflow-hidden transition-colors"
    >
      {/* Anchor point for #gallery navigation */}
      <div id="gallery" className="absolute -top-20 left-0" />

      {/* Ambient background glows (dark mode only) */}
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-amber-500/5 dark:bg-ceylon-gold/10 rounded-full blur-[120px] pointer-events-none hidden dark:block" />
      <div className="absolute bottom-10 -left-48 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-emerald-950/80 border border-amber-300 dark:border-ceylon-gold/30 text-xs font-semibold text-amber-800 dark:text-ceylon-gold uppercase tracking-wider shadow-sm">
              <Compass size={14} />
              <span>Island Destinations & Photo Gallery</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white tracking-tight">
              Iconic Places to Discover & <br />
              <span className="text-gold-gradient font-serif">Guest Travel Gallery</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base font-normal dark:font-light leading-relaxed">
              Explore 17 breathtaking travelling spots across Sri Lanka, together with real travel snapshots shared by our guests on private tours.
            </p>
          </div>

          {/* Action: Add Your Travel Photo */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 dark:bg-white/5 dark:hover:bg-white/10 border border-amber-400 dark:border-ceylon-gold/30 text-amber-800 dark:text-ceylon-gold text-xs font-bold shadow-sm transition-all active:scale-95"
            >
              <UploadCloud size={15} />
              <span>Add Review & Photo</span>
            </button>
            <div className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center sm:justify-start gap-1.5">
              <Camera size={13} className="text-amber-600 dark:text-ceylon-gold" />
              <span>{filteredItems.length} Photos</span>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-8 space-y-3">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:to-amber-500 text-stone-900 dark:text-ceylon-dark shadow-sm font-bold'
                    : 'bg-white hover:bg-stone-50 dark:bg-white/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-md">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search by destination name, region, or tags (e.g. Galle, Safari, Jaffna)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-[#051810] border border-stone-200 dark:border-white/15 rounded-xl pl-9 pr-3.5 py-2 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (idx % 8) * 0.05 }}
              onClick={() => setLightboxIndex(idx)}
              className="liquid-glass-card rounded-2xl overflow-hidden group cursor-pointer border border-stone-200 dark:border-white/10 shadow-md hover:shadow-xl flex flex-col justify-between transition-all"
            >
              {/* Photo Viewport */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-stone-100 dark:bg-black/30">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold backdrop-blur-md border ${
                      item.isReview
                        ? 'bg-amber-500/90 text-stone-900 border-amber-300'
                        : 'bg-emerald-950/85 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {item.badge}
                  </span>

                  <span className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} />
                  </span>
                </div>

                {/* Bottom Overlay on Image */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10 text-left">
                  {item.region && (
                    <div className="flex items-center gap-1 text-[10px] text-amber-300 font-medium truncate mb-0.5">
                      <MapPin size={11} className="shrink-0" />
                      <span className="truncate">{item.region}</span>
                    </div>
                  )}
                  {item.isReview && (
                    <div className="flex items-center gap-1 text-[10px] text-amber-300 font-medium">
                      <span>Shared by {item.customer_name}</span>
                    </div>
                  )}
                  <h3 className="font-serif text-sm sm:text-base font-bold text-white group-hover:text-amber-300 dark:group-hover:text-ceylon-gold transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Info */}
              <div className="p-3 sm:p-3.5 text-left bg-transparent flex flex-col justify-between flex-grow">
                {item.isReview ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={i < item.rating ? 'fill-current' : 'text-stone-300 dark:text-stone-700'}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 italic line-clamp-2">
                      "{item.comment}"
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-300 line-clamp-2">
                      {item.description}
                    </p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-white/5 text-[9px] text-stone-600 dark:text-stone-400"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center space-y-3 liquid-glass-card rounded-2xl p-8 max-w-md mx-auto mt-6">
            <Camera size={36} className="mx-auto text-amber-600 dark:text-ceylon-gold opacity-60" />
            <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-white">No photos match your query</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Try searching with another keyword like Sigiriya, Kandy, Galle, or choose "All Photos & Places".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-amber-400 dark:bg-ceylon-gold text-stone-900 dark:text-ceylon-dark text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom Banner: Custom Tour Enquiry */}
        <div className="mt-12 sm:mt-16 liquid-glass-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-left">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-1.5 text-xs text-amber-700 dark:text-ceylon-gold font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Tailor-Made Routes</span>
            </div>
            <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-950 dark:text-white">
              Want to visit any of these 17 destinations?
            </h4>
            <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-normal">
              Pick your dream spots and vehicle type (Cars for up to 4, Vans for up to 10, or Buses for larger groups). We customize the complete route for you.
            </p>
          </div>
          <a
            href={getWhatsAppLink("Hi MR Travels & Tours, I saw your photo gallery and would like to plan a private trip visiting several of these destinations.")}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto shrink-0 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider text-center shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            <span>Consult Route on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* 5. Interactive Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl bg-white dark:bg-[#062015] border border-stone-200 dark:border-ceylon-gold/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto text-left relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg"
              >
                <X size={18} />
              </button>

              {/* Prev / Next Navigation Arrows */}
              <button
                onClick={() =>
                  setLightboxIndex(
                    (prev) => (prev - 1 + filteredItems.length) % filteredItems.length
                  )
                }
                className="absolute left-3 top-1/3 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg"
                title="Previous photo"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={() =>
                  setLightboxIndex((prev) => (prev + 1) % filteredItems.length)
                }
                className="absolute right-3 top-1/3 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all shadow-lg"
                title="Next photo"
              >
                <ChevronRight size={22} />
              </button>

              {/* Lightbox Main Image */}
              <div className="h-64 sm:h-96 lg:h-[420px] w-full relative overflow-hidden bg-black">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                <div className="absolute bottom-4 left-4 sm:left-6 right-4 sm:right-6">
                  <span className="px-3 py-1 rounded-full bg-amber-400 dark:bg-ceylon-gold text-stone-900 dark:text-ceylon-dark font-bold text-xs">
                    {activeItem.badge}
                  </span>
                  <h3 className="font-serif text-xl sm:text-3xl font-bold text-white mt-1.5">
                    {activeItem.title}
                  </h3>
                </div>
              </div>

              {/* Lightbox Content & Details */}
              <div className="p-4 sm:p-6 lg:p-7 space-y-4">
                {activeItem.isReview ? (
                  /* Review Details */
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-white/10 pb-3">
                      <div>
                        <span className="text-stone-500 dark:text-stone-400 text-xs block">Guest Traveler:</span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                          {activeItem.customer_name}
                        </h4>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < activeItem.rating ? 'fill-current' : 'text-stone-300 dark:text-stone-700'}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm italic leading-relaxed">
                      "{activeItem.comment}"
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                      <span className="text-xs text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                        <CheckCircle2 size={14} /> Verified Guest Experience
                      </span>

                      <a
                        href={getWhatsAppLink(`Hi MR Travels & Tours, I saw the guest review for "${activeItem.title}". I would like to ask about this tour package.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:brightness-110 transition-all"
                      >
                        <MessageCircle size={15} />
                        <span>Inquire About This Tour</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Destination Details */
                  <div className="space-y-3.5">
                    <p className="text-stone-800 dark:text-stone-200 text-xs sm:text-sm font-normal leading-relaxed">
                      {activeItem.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2.5 border-y border-stone-200 dark:border-white/10 text-xs">
                      {activeItem.bestTime && (
                        <div>
                          <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Recommended Time:</span>
                          <span className="text-emerald-700 dark:text-emerald-300 font-semibold flex items-center gap-1.5">
                            <Clock size={13} /> {activeItem.bestTime}
                          </span>
                        </div>
                      )}
                      {activeItem.region && (
                        <div>
                          <span className="text-stone-500 dark:text-stone-400 block mb-0.5">Region:</span>
                          <span className="text-stone-900 dark:text-white font-medium flex items-center gap-1.5">
                            <MapPin size={13} className="text-amber-600 dark:text-ceylon-gold" /> {activeItem.region}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                      {activeItem.tags && (
                        <div className="flex flex-wrap gap-1.5">
                          {activeItem.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-[10px] sm:text-xs text-stone-700 dark:text-stone-300"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>
                      )}

                      <a
                        href={getWhatsAppLink(`Hi MR Travels & Tours, I would love to visit ${activeItem.title} on a private tour. What are the vehicle options and itinerary?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md"
                      >
                        <MessageCircle size={15} />
                        <span>Inquire on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review & Photo Submission Modal */}
      {isReviewModalOpen && (
        <ReviewModal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}
    </section>
  );
}
