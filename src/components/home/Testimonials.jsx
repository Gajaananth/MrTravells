import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, MessageSquarePlus, Calendar } from 'lucide-react';
import { fetchApprovedReviews } from '../../lib/supabaseClient';
import ReviewModal from './ReviewModal';

export default function Testimonials() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data = await fetchApprovedReviews();
        const approved = (data || []).filter(r => Number(r.rating) >= 3 && r.is_approved !== false);
        setReviews(approved);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  const handleReviewAdded = (newReview) => {
    if (newReview && Number(newReview.rating) >= 3) {
      setReviews(prev => [newReview, ...prev]);
    }
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white dark:bg-[#051810] relative overflow-hidden transition-colors">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 dark:bg-emerald-950/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div className="space-y-2 sm:space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-emerald-950/80 border border-amber-300 dark:border-ceylon-gold/30 text-xs font-semibold text-amber-800 dark:text-ceylon-gold uppercase tracking-wider shadow-sm">
              <Star size={14} className="fill-current text-amber-500 dark:text-ceylon-gold" />
              <span>Verified Guest Stories</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white tracking-tight">
              Words From Our <br />
              <span className="text-gold-gradient font-serif">Private Car Travelers</span>
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base font-normal dark:font-light">
              Real unfiltered reviews from guests who explored Sri Lanka with MR Travels & Tours. We take pride in 5-star service with genuine personal hospitality.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            id="write-review-btn"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:to-amber-500 text-stone-900 dark:text-ceylon-dark font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-105 transition-all active:scale-95"
          >
            <MessageSquarePlus size={16} />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white dark:glass-card h-60 rounded-2xl animate-pulse p-6 border border-stone-200 dark:border-white/10" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {reviews.map((rev, idx) => (
              <motion.div
                key={rev.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-white dark:glass-card p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-ceylon-gold/20 flex flex-col justify-between relative group text-left shadow-sm hover:shadow-md dark:shadow-xl transition-all"
              >
                <div>
                  {/* Top: Star rating & verified badge */}
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 dark:text-ceylon-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < rev.rating
                              ? 'text-amber-500 fill-amber-500 dark:text-ceylon-gold dark:fill-ceylon-gold'
                              : 'text-stone-300 dark:text-stone-700'
                          } sm:w-4 sm:h-4`}
                        />
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] text-emerald-800 dark:text-emerald-400 font-medium bg-white dark:bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-500/20">
                      <CheckCircle2 size={12} />
                      <span>Verified Guest</span>
                    </span>
                  </div>

                  {/* Comment Text */}
                  <div className="relative mb-4 sm:mb-6">
                    <Quote size={20} className="text-amber-400/20 dark:text-ceylon-gold/20 absolute -top-2 -left-1 -z-10" />
                    <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm leading-relaxed font-normal dark:font-light italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  {/* Customer Attached Photo */}
                  {rev.image_url && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-stone-200 dark:border-white/10 h-32 sm:h-36 max-w-xs">
                      <img
                        src={rev.image_url}
                        alt={`Photo by ${rev.customer_name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Reviewer Details Footer */}
                <div className="pt-3 sm:pt-4 border-t border-stone-200 dark:border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-sm sm:text-base font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-ceylon-gold transition-colors">
                      {rev.customer_name}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
                      {rev.package_name || 'Sri Lanka Private Tour'}
                    </p>
                  </div>

                  {rev.created_at && (
                    <div className="text-[10px] sm:text-[11px] text-stone-400 dark:text-stone-500 flex items-center gap-1">
                      <Calendar size={11} />
                      <span>{new Date(rev.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewAdded={handleReviewAdded}
      />
    </section>
  );
}
