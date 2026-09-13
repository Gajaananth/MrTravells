import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, CheckCircle2, MessageCircle, Loader2, Sparkles, Car } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitEnquiry } from '../../lib/supabaseClient';
import { getWhatsAppLink } from '../../lib/config';

export default function PackageEnquiryModal({ pkg, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp_number: '',
    date: '',
    vehicle_type: 'Private Car (Up to 4 Guests)',
    passengers: '2 Adults (Private Car)',
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
      const fullMessage = `Date: ${formData.date || 'Flexible'} | Vehicle: ${formData.vehicle_type} | Travelers: ${formData.passengers} | Notes: ${formData.notes || 'None'}`;
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
        setErrorMsg(result?.error || 'Could not submit your enquiry. Please message us on WhatsApp.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white dark:bg-[#062015] border border-stone-200 dark:border-ceylon-gold/30 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-6 text-left relative"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 pb-3 border-b border-stone-200 dark:border-white/10 flex items-start justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-ceylon-gold font-bold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>Tour Inquiry & Quote</span>
            </div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-white">
              Inquire About {pkg.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-white/10 text-stone-400 hover:text-stone-700 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6">
          {submitted ? (
            <div className="py-6 sm:py-8 text-center space-y-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white dark:bg-emerald-500/20 border border-emerald-300 dark:border-transparent text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 size={34} />
              </div>
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">Enquiry Received!</h4>
              <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm font-normal dark:font-light">
                MR Travels & Tours has received your booking request for <strong>{pkg.title}</strong>. We will reply to your WhatsApp at <span className="text-amber-700 dark:text-ceylon-gold font-semibold">{formData.whatsapp_number}</span> with vehicle options and a custom price quote shortly!
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getWhatsAppLink(`Hi MR Travels & Tours, I just submitted an enquiry for ${pkg.title}. Please provide the price details.`)}
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
              {/* Package Summary strip */}
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-black/40 border border-stone-200 dark:border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-stone-500 dark:text-stone-400 block text-[10px] sm:text-[11px]">Selected Package:</span>
                  <span className="text-stone-900 dark:text-white font-semibold text-xs truncate max-w-[200px] block">{pkg.title}</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-700 dark:text-ceylon-gold font-serif text-xs sm:text-sm font-bold">Consult for Price</span>
                  <span className="text-stone-500 dark:text-stone-400 text-[10px] block">Custom Quote</span>
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

              {/* Vehicle Type & Travelers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Preferred Vehicle</label>
                  <select
                    value={formData.vehicle_type}
                    onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                  >
                    <option value="Private Car (Up to 4 Guests)">Car (Up to 4 Guests)</option>
                    <option value="Passenger Van (Up to 10 Guests)">Passenger Van (Up to 10 Guests)</option>
                    <option value="Mini-Bus / Coach (10+ Guests)">Mini-Bus / Coach (10+ Guests)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Group Size</label>
                  <select
                    value={formData.passengers}
                    onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                    className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                  >
                    <option value="1 Solo Traveler (Car)">1 Solo Traveler (Car)</option>
                    <option value="2 Adults (Car)">2 Adults (Car)</option>
                    <option value="3 - 4 Persons (Car)">3 - 4 Persons (Car)</option>
                    <option value="5 - 7 Persons (Van)">5 - 7 Persons (Van)</option>
                    <option value="8 - 10 Persons (Van)">8 - 10 Persons (Van)</option>
                    <option value="11 - 20 Persons (Mini-Bus)">11 - 20 Persons (Mini-Bus)</option>
                    <option value="20+ Persons (Large Bus)">20+ Persons (Large Bus)</option>
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-stone-700 dark:text-stone-300 mb-1 font-medium">Preferred Tour Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 text-stone-900 dark:text-stone-200 text-xs focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none"
                />
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
                    <span>Request Custom Quote</span>
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
