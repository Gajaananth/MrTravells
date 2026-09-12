import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, CheckCircle2, MessageCircle, Loader2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitEnquiry } from '../../lib/supabaseClient';
import { getWhatsAppLink } from '../../lib/config';

export default function PackageEnquiryModal({ pkg, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp_number: '',
    date: '',
    passengers: '2 Adults',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!pkg) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.whatsapp_number) {
      setErrorMsg('Please enter your full name, email, and WhatsApp number.');
      return;
    }

    setLoading(true);

    try {
      const fullMessage = `Date: ${formData.date || 'Flexible'} | Passengers: ${formData.passengers} | Notes: ${formData.notes || 'None'}`;
      const payload = {
        name: formData.name,
        email: formData.email,
        whatsapp_number: formData.whatsapp_number,
        package_name: pkg.title,
        message: fullMessage
      };

      const result = await submitEnquiry(payload);
      if (result && result.success) {
        setSubmitted(true);
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        } catch (e) {}
      } else {
        setErrorMsg('Failed to submit enquiry. Please message us on WhatsApp.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        className="bg-white dark:bg-[#072418] border border-stone-200 dark:border-ceylon-gold/30 rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative text-left my-auto transition-colors"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4 border-b border-stone-200 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-white dark:bg-ceylon-gold/20 border border-amber-300 dark:border-transparent flex items-center justify-center text-amber-700 dark:text-ceylon-gold">
              <Sparkles size={18} />
            </span>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900 dark:text-white">Book Tour Package</h3>
              <p className="text-xs text-amber-700 dark:text-ceylon-gold font-medium truncate max-w-xs">{pkg.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-stone-100 dark:bg-white/5 dark:hover:bg-white/10 text-stone-600 dark:text-stone-300 flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 max-h-[82vh] overflow-y-auto">
          {submitted ? (
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-emerald-500/20 border border-emerald-300 dark:border-transparent text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 size={34} />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">Enquiry Received!</h4>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm font-normal dark:font-light">
                MR Travels & Tours has received your booking request for <strong>{pkg.title}</strong> ({pkg.pricing.formatted}). We will reply to your WhatsApp at <span className="text-amber-700 dark:text-ceylon-gold font-semibold">{formData.whatsapp_number}</span> shortly!
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getWhatsAppLink(`Hi MR Travels & Tours, I just submitted an enquiry for ${pkg.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                >
                  <MessageCircle size={16} />
                  <span>Chat on WhatsApp Now</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-2.5 rounded-xl bg-white dark:bg-white/10 text-stone-700 dark:text-stone-300 text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              {/* Package Summary strip in LKR */}
              <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-stone-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] sm:text-[11px]">Selected Package:</span>
                  <span className="text-stone-900 dark:text-white font-semibold text-xs truncate max-w-[200px] block">{pkg.title}</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-700 dark:text-ceylon-gold font-serif text-sm sm:text-base font-bold">{pkg.pricing.formatted}</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[10px] block">Vehicle Total</span>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">
                  Your Full Name <span className="text-amber-600 dark:text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Williams"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                />
              </div>

              {/* Email & WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">
                    Email Address <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="david@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">
                    WhatsApp Number <span className="text-amber-600 dark:text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+94 77 123 4567"
                    value={formData.whatsapp_number}
                    onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Preferred Date & Group Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Preferred Tour Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Travelers</label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                  >
                    <option value="1 Solo Traveler">1 Solo Traveler</option>
                    <option value="2 Adults">2 Adults (Couple)</option>
                    <option value="3 Adults">3 Adults (Max Sedan Capacity)</option>
                    <option value="2 Adults + 1 Child">2 Adults + 1 Child</option>
                  </select>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Pick-up Location & Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Staying in Colombo, need pick-up at 6:30 AM..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl p-3 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none resize-none"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-white dark:bg-red-950/60 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-300 text-xs">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:via-amber-400 dark:to-amber-500 text-stone-900 dark:text-ceylon-dark font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    <span>Processing Enquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Reservation Request ({pkg.pricing.formatted})</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
