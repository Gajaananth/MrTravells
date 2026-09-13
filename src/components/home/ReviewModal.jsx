import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Star, Upload, CheckCircle2, AlertCircle, Sparkles, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitReview } from '../../lib/supabaseClient';
import { PACKAGES } from '../../data/packages';

export default function ReviewModal({ isOpen, onClose, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_whatsapp: '',
    package_name: PACKAGES[0]?.title || 'Sigiriya Lion Rock & Dambulla Cave Temples',
    comment: '',
    image_base64: null,
    image_name: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg('Image file size must be less than 4MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData(prev => ({
        ...prev,
        image_base64: reader.result,
        image_name: file.name
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.customer_name || !formData.customer_email || !formData.customer_whatsapp) {
      setErrorMsg('Please fill in your name, email address, and WhatsApp contact number.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        rating,
        image_url: formData.image_base64 || null
      };

      const result = await submitReview(payload);

      if (result && result.success) {
        setSuccess(true);
        if (rating >= 4) {
          try {
            confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
          } catch (e) {}
        }
        if (result.review) {
          try {
            window.dispatchEvent(new CustomEvent('new-review-added', { detail: result.review }));
          } catch (e) {}
          if (onReviewAdded) {
            onReviewAdded(result.review);
          }
        }
      } else {
        setErrorMsg(result?.error || 'Failed to submit review. Please check your details and retry.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred while submitting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        className="liquid-glass-card rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-left my-auto"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-white dark:bg-ceylon-gold/20 border border-amber-300 dark:border-transparent flex items-center justify-center text-amber-700 dark:text-ceylon-gold">
              <Sparkles size={18} />
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white">Share Your Tour Review</h3>
              <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">Help future travelers explore Sri Lanka</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-50 border border-stone-200 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto">
          {success ? (
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-emerald-500/20 border border-emerald-300 dark:border-transparent text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">Ayubowan & Thank You!</h4>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-sm mx-auto font-normal dark:font-light">
                {rating <= 2
                  ? "We take your feedback very seriously. Our team will review this and reach out directly to make things right."
                  : "Your review has been submitted successfully! We loved hosting you in Sri Lanka and wish you safe future travels."}
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-ceylon-gold text-ceylon-dark font-bold text-xs uppercase tracking-wider"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              
              {/* Star Rating Picker */}
              <div className="bg-white dark:bg-black/30 p-3 sm:p-4 rounded-xl border border-stone-200 dark:border-white/5 text-center">
                <label className="block text-stone-800 dark:text-stone-300 font-semibold mb-1.5 text-xs sm:text-sm">
                  How was your tour experience?
                </label>
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={`${
                            isFilled
                              ? 'text-amber-400 fill-amber-400 dark:text-ceylon-gold dark:fill-ceylon-gold'
                              : 'text-stone-300 dark:text-stone-600'
                          } transition-colors sm:w-7 sm:h-7`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-[10px] sm:text-[11px] text-amber-700 dark:text-ceylon-gold font-medium mt-1.5">
                  {rating === 5 && "🌟 Exceptional 5-Star Journey!"}
                  {rating === 4 && "👍 Very Good Experience!"}
                  {rating === 3 && "👌 Good Tour (with room for improvement)"}
                  {rating === 2 && "⚠️ Below expectations"}
                  {rating === 1 && "⚠️ Poor experience (Team will follow up urgently)"}
                </div>
              </div>

              {/* Package Selector */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Tour Package Taken</label>
                <select
                  value={formData.package_name}
                  onChange={(e) => setFormData({ ...formData, package_name: e.target.value })}
                  className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                >
                  {PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.title}>
                      {pkg.title}
                    </option>
                  ))}
                  <option value="Custom Multi-Day Sri Lanka Tour">Custom Multi-Day Sri Lanka Tour</option>
                </select>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Your Name (shown publicly)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah & Mark Jenkins"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                />
              </div>

              {/* Email & WhatsApp (Private) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">
                    Email Address <span className="text-stone-400 font-normal">(private)</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.customer_email}
                    onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">
                    WhatsApp Number <span className="text-stone-400 font-normal">(private)</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+94 77 123 4567"
                    value={formData.customer_whatsapp}
                    onChange={(e) => setFormData({ ...formData, customer_whatsapp: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Your Tour Experience & Feedback</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell other travelers about the car, driver guide, stops, and highlights..."
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl p-3 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none resize-none transition-colors"
                />
              </div>

              {/* Optional Photo Upload */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">
                  Add a Travel Photo <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 dark:bg-white/5 dark:hover:bg-white/10 border border-stone-200 dark:border-white/15 cursor-pointer text-stone-700 dark:text-stone-300 transition-colors">
                    <Upload size={13} className="text-amber-600 dark:text-ceylon-gold" />
                    <span>Choose Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {imagePreview && (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-amber-400 dark:border-ceylon-gold/40">
                      <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setFormData(prev => ({ ...prev, image_base64: null, image_name: '' }));
                        }}
                        className="absolute top-0 right-0 bg-black/70 text-white p-0.5 rounded-bl"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Error Box */}
              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-white dark:bg-red-950/60 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-300 flex items-center gap-2 text-xs">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:via-amber-400 dark:to-amber-500 text-stone-900 dark:text-ceylon-dark font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <span>Submit Guest Review</span>
                )}
              </button>

            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
