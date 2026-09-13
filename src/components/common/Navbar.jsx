import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, Menu, X, MessageCircle, Sparkles, Sun, Moon } from 'lucide-react';
import { APP_CONFIG, getWhatsAppLink } from '../../lib/config';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'All Packages', path: '/packages' },
    { label: 'Destinations', path: '/#destinations' },
    { label: 'Why Us', path: '/#usp' },
    { label: 'Guest Reviews', path: '/#reviews' },
    { label: 'Enquire', path: '/#enquiry' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-3.5 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        {/* Curved-Edge Liquid Glass Container */}
        <div
          className={`relative rounded-2xl sm:rounded-full bg-white/95 dark:bg-gradient-to-r dark:from-[#041a11]/95 dark:via-[#083321]/90 dark:to-[#041a11]/95 backdrop-blur-2xl border border-stone-200/90 dark:border-emerald-400/25 shadow-[0_8px_30px_0_rgba(0,0,0,0.06)] dark:shadow-[0_12px_40px_0_rgba(0,0,0,0.45)] px-4 sm:px-6 lg:px-8 transition-all duration-300 overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1.5px] before:bg-gradient-to-r before:from-transparent before:via-stone-300/40 dark:before:via-white/35 before:to-transparent before:pointer-events-none flex items-center justify-between ${
            isScrolled ? 'py-2 sm:py-2.5 shadow-xl' : 'py-2.5 sm:py-3.5'
          }`}
        >
          {/* Ambient Liquid Glow (dark only) */}
          <div className="absolute -top-10 left-1/4 w-32 h-20 bg-emerald-400/15 rounded-full blur-xl pointer-events-none hidden dark:block" />
          <div className="absolute -bottom-10 right-1/4 w-32 h-20 bg-ceylon-gold/15 rounded-full blur-xl pointer-events-none hidden dark:block" />

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group z-10">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 dark:from-ceylon-gold dark:to-amber-600 flex items-center justify-center text-white dark:text-ceylon-dark shadow-md group-hover:rotate-6 transition-transform">
              <Compass size={20} className="stroke-[2.5]" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif text-sm sm:text-lg font-bold tracking-tight text-stone-950 dark:text-white flex items-center gap-1">
                MR Travels <span className="text-amber-600 dark:text-ceylon-gold font-sans font-medium">& Tours</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-widest uppercase text-stone-500 dark:text-emerald-300 font-bold">
                Sri Lanka Private Tours
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 z-10">
            {navLinks.map((link) => {
              const isPackages = link.path === '/packages';
              const isActive = isPackages
                ? location.pathname === '/packages'
                : location.pathname === '/' && !location.hash;

              return (
                <a
                  key={link.label}
                  href={link.path}
                  className={`text-xs lg:text-sm font-medium transition-all ${
                    isActive
                      ? 'text-amber-700 dark:text-ceylon-gold font-bold'
                      : 'text-stone-700 hover:text-amber-700 dark:text-stone-200 dark:hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Header Actions & Theme Switcher */}
          <div className="hidden lg:flex items-center gap-2.5 z-10">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              id="theme-toggle-btn"
              title={isDark ? "Switch to Pure White Light Theme" : "Switch to Dark Theme"}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-white/10 dark:hover:bg-white/20 border border-stone-300 dark:border-white/20 text-stone-800 dark:text-ceylon-gold transition-all shadow-inner"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} className="text-amber-300" /> : <Moon size={15} className="text-stone-700" />}
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={getWhatsAppLink("Hi MR Travels & Tours, I'd like to ask about available tour dates.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/70 dark:hover:bg-emerald-900 border border-emerald-300 dark:border-emerald-500/30 transition-all"
            >
              <MessageCircle size={14} className="text-[#25D366]" />
              <span>+94 77 123 4567</span>
            </a>

            {/* CTA Button */}
            <Link
              to="/packages"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-ceylon-dark bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:via-amber-400 dark:to-amber-500 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Sparkles size={13} />
              <span>Explore Tours</span>
            </Link>
          </div>

          {/* Mobile menu trigger button & quick actions */}
          <div className="flex md:hidden items-center gap-1.5 z-10">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? "Light Mode" : "Dark Mode"}
              className="p-1.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-amber-300 border border-stone-300 dark:border-white/15"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-[#25D366] border border-emerald-300 dark:border-emerald-500/30"
              aria-label="WhatsApp"
            >
              <MessageCircle size={17} />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full bg-stone-100 dark:bg-white/10 text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white border border-stone-300 dark:border-white/15"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Curved Glass Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 rounded-2xl bg-white/95 dark:bg-[#041a11]/95 backdrop-blur-2xl border border-stone-200 dark:border-emerald-400/25 p-4 shadow-2xl text-left space-y-2 animate-fade-in text-stone-900 dark:text-white">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-xs font-medium text-stone-800 hover:text-amber-700 dark:text-stone-200 dark:hover:text-ceylon-gold border-b border-stone-100 dark:border-white/10"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-md"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                to="/packages"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 dark:from-ceylon-gold dark:via-amber-400 dark:to-amber-500 text-stone-900 dark:text-ceylon-dark font-bold text-xs uppercase tracking-wider shadow-sm"
              >
                View Tour Packages
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
