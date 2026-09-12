import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MessageCircle, Mail, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { submitEnquiry } from '../../lib/supabaseClient';
import { APP_CONFIG, getWhatsAppLink } from '../../lib/config';
import { PACKAGES } from '../../data/packages';

export default function EnquirySection({ prefillPackage = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp_number: '',
    package_name: prefillPackage || PACKAGES[0]?.title || 'Sigiriya Lion Rock & Dambulla Cave Temples',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (prefillPackage) {
      setFormData(prev => ({ ...prev, package_name: prefillPackage }));
    }
  }, [prefillPackage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name || !formData.email || !formData.whatsapp_number) {
      setErrorMsg('Please provide your full name, email, and WhatsApp contact number.');
      return;
    }

    setLoading(true);

    try {
      const result = await submitEnquiry(formData);
      if (result && result.success) {
        setSubmitted(true);
        try {
          confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
        } catch (e) {}
      } else {
        setErrorMsg(result?.error || 'Failed to send enquiry. Please contact us directly on WhatsApp.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An error occurred. Please message us on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="enquiry" className="py-16 sm:py-24 bg-white dark:bg-gradient-to-b dark:from-[#051810] dark:via-[#072619] dark:to-[#030e09] relative overflow-hidden transition-colors">
      {/* Background ambient lighting (dark mode only) */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-ceylon-gold/10 rounded-full blur-[140px] pointer-events-none hidden dark:block" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none hidden dark:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Direct Contact & Driver Intro */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white dark:bg-emerald-950/80 border border-amber-300 dark:border-ceylon-gold/30 text-xs font-semibold text-amber-800 dark:text-ceylon-gold uppercase tracking-wider shadow-sm">
              <Sparkles size={14} />
              <span>Direct Booking & Enquiries</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-white tracking-tight">
              Plan Your Journey With <br />
              <span className="text-gold-gradient font-serif">MR Travels & Tours</span>
            </h2>

            <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-base font-normal dark:font-light leading-relaxed">
              Have specific travel dates, custom destinations, or traveling with family? Send your enquiry below or message directly on WhatsApp for instant confirmation.
            </p>

            {/* Quick Contact Cards */}
            <div className="space-y-2.5 sm:space-y-3 pt-1">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white dark:glass-card p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 group cursor-pointer border border-stone-200 dark:border-emerald-500/30 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">Fastest Response (Instant WhatsApp)</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    Chat on WhatsApp: +94 77 123 4567
                  </div>
                </div>
              </a>

              <div className="bg-white dark:glass-card p-3.5 sm:p-4 rounded-2xl flex items-center gap-3 sm:gap-4 border border-stone-200 dark:border-white/10 shadow-sm">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white dark:bg-ceylon-gold/20 border border-amber-300 dark:border-transparent text-amber-700 dark:text-ceylon-gold flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400">Direct Email</div>
                  <div className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                    {APP_CONFIG.email}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5 shadow-sm">
              <ShieldCheck size={18} className="shrink-0 text-amber-600 dark:text-ceylon-gold" />
              <span>We never share your contact details. Your inquiry triggers an instant notification to the operator only.</span>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:glass-card p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-stone-200 dark:border-ceylon-gold/30 shadow-lg dark:shadow-2xl relative">
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 sm:py-12 text-center space-y-4 sm:space-y-5"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-emerald-500/20 border border-emerald-300 dark:border-transparent text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 size={38} />
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    Thanks, we'll contact you shortly!
                  </h3>
                  <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm max-w-md mx-auto font-normal dark:font-light leading-relaxed">
                    MR Travels & Tours has received your tour enquiry. We will reach out to you on WhatsApp at <strong className="text-amber-600 dark:text-ceylon-gold font-medium">{formData.whatsapp_number}</strong> with package availability and details.
                  </p>

                  <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getWhatsAppLink(`Hi MR Travels & Tours, I just submitted an enquiry for the ${formData.package_name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageCircle size={16} />
                      <span>Message on WhatsApp Now</span>
                    </a>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          whatsapp_number: '',
                          package_name: PACKAGES[0]?.title || '',
                          message: ''
                        });
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white dark:bg-white/10 hover:bg-stone-50 dark:hover:bg-white/15 border border-stone-300 dark:border-transparent text-stone-700 dark:text-stone-300 text-xs font-semibold"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-left">
                  <div className="mb-1 sm:mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">Request a Tour Quotation</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">Receive a tailored LKR quote within hours</p>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Full Name <span className="text-amber-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Thomas Anderson"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 dark:text-stone-200 text-xs sm:text-sm focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email & WhatsApp Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        Email Address <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="thomas@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 dark:text-stone-200 text-xs sm:text-sm focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                        WhatsApp Number <span className="text-amber-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+94 77 123 4567"
                        value={formData.whatsapp_number}
                        onChange={(e) => setFormData({ ...formData, whatsapp_number: e.target.value })}
                        className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 dark:text-stone-200 text-xs sm:text-sm focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Package of Interest in LKR */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Interested Tour Package
                    </label>
                    <select
                      value={formData.package_name}
                      onChange={(e) => setFormData({ ...formData, package_name: e.target.value })}
                      className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 dark:text-stone-200 text-xs sm:text-sm focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none transition-colors"
                    >
                      {PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.title}>
                          {pkg.title} ({pkg.pricing.formatted})
                        </option>
                      ))}
                      <option value="Custom Multi-Day Sri Lanka Tour">Custom Multi-Day Tour (Multiple destinations)</option>
                      <option value="Airport Transfer & Private Chauffeur">Airport Transfer & Hourly Chauffeur</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                      Travel Dates, Group Size & Notes <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Arriving on March 15th at Colombo airport, 2 adults, interested in Sigiriya and Ella..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-white dark:bg-[#051810] border border-stone-300 dark:border-white/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-stone-900 dark:text-stone-200 text-xs sm:text-sm focus:border-amber-500 dark:focus:border-ceylon-gold focus:outline-none resize-none transition-colors"
                    />
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-white dark:bg-red-950/60 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-300 text-xs">
                      {errorMsg}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    id="enquiry-submit-btn"
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 dark:from-ceylon-gold dark:via-amber-400 dark:to-amber-500 text-stone-900 dark:text-ceylon-dark font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending Tour Enquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Submit Enquiry (Instant Notification)</span>
                      </>
                    )}
                  </button>

                  <div className="text-center pt-1">
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Need immediate confirmation?{' '}
                      <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                      >
                        WhatsApp us directly
                      </a>
                    </span>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
