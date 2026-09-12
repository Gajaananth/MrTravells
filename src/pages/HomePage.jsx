import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import USPSection from '../components/home/USPSection';
import DestinationsGallery from '../components/home/DestinationsGallery';
import PackagesPreview from '../components/home/PackagesPreview';
import Testimonials from '../components/home/Testimonials';
import EnquirySection from '../components/home/EnquirySection';

export default function HomePage() {
  const [selectedPackageForEnquiry, setSelectedPackageForEnquiry] = useState('');

  const handleOpenEnquiry = (packageName) => {
    setSelectedPackageForEnquiry(packageName);
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full">
      {/* 1. Hero Section with 3D Car Animation */}
      <HeroSection />

      {/* 2. USP / About Strip */}
      <USPSection />

      {/* 3. Featured 5 Curated Destinations Gallery */}
      <DestinationsGallery />

      {/* 4. Packages Preview */}
      <PackagesPreview onOpenEnquiry={handleOpenEnquiry} />

      {/* 5. Approved Testimonials & Review Submission */}
      <Testimonials />

      {/* 6. Contact & Enquiry Form */}
      <EnquirySection prefillPackage={selectedPackageForEnquiry} />
    </main>
  );
}
