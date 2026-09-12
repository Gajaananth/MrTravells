// Global Application Configuration
export const APP_CONFIG = {
  companyName: "MR Travels & Tours",
  tagline: "Your Private Island Journey Across Sri Lanka",
  ownerTitle: "Private Chauffeur & Tour Guide Service",
  vehicle: "Toyota Hybrid Luxury Sedan (Whisper-Quiet A/C, Panoramic Windows)",
  experienceYears: 12,
  licenseNumber: "SLTDA / CH-8942",
  location: "Colombo / Negombo / Kandy & Islandwide, Sri Lanka",
  phone: "+94 77 123 4567",
  email: "mrtravelsandtours@gmail.com",
  developerCredit: "Developed by Tradiq Zium Techs. Rights for MR Travels & Tours.",
  
  // WhatsApp Configuration (Digits only, international format)
  whatsappNumber: import.meta.env.VITE_OWNER_WHATSAPP_NUMBER || "94771234567",

  // Social Links
  socials: {
    tripadvisor: "https://www.tripadvisor.com",
    instagram: "https://instagram.com",
    facebook: "https://facebook.com"
  }
};

export const getWhatsAppLink = (customText) => {
  const number = APP_CONFIG.whatsappNumber.replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(customText || "Hi MR Travels & Tours, I'd like to enquire about your Sri Lanka tour packages.");
  return `https://wa.me/${number}?text=${encoded}`;
};
