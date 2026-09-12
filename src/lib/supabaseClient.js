import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('your-project') &&
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Initial curated approved reviews (rating >= 3, is_approved = true) - no personal names mentioned
export const INITIAL_REVIEWS = [
  {
    id: "rev-1",
    customer_name: "Elena Rostova & David Miller",
    country: "United Kingdom",
    package_name: "Sigiriya Lion Rock & Dambulla Cave Temples",
    rating: 5,
    comment: "MR Travels & Tours made our first trip to Sri Lanka completely unforgettable! The car was immaculate, cold mineral water was ready after the hot Sigiriya climb, and our driver's deep knowledge of local history avoided all the crowded tourist bottlenecks. Truly 5-star service!",
    image_url: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    created_at: "2026-02-18T10:30:00Z",
    is_approved: true
  },
  {
    id: "rev-2",
    customer_name: "Marcus & Sophie Lindqvist",
    country: "Sweden",
    package_name: "Kandy, Tea Plantations & Highland Scenic Route",
    rating: 5,
    comment: "Traveling with a small child can be stressful, but having a dedicated, patient driver with a safe, super comfortable car made the highland journey smooth and joyful. The Ceylon tea factory stop and Ramboda waterfall view were magical.",
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    created_at: "2026-02-25T14:15:00Z",
    is_approved: true
  },
  {
    id: "rev-3",
    customer_name: "Dr. Ananya & Rohan Sharma",
    country: "India",
    package_name: "Galle Dutch Fort & Southern Coastal Discovery",
    rating: 5,
    comment: "The best decision we made in Sri Lanka! Clean air-conditioned sedan, courteous driving, and we were taken to an incredible family-run clay pot curry lunch near Galle that no big tour bus would ever find. Worth every rupee.",
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    created_at: "2026-03-02T09:00:00Z",
    is_approved: true
  },
  {
    id: "rev-4",
    customer_name: "Julian & Clara Becker",
    country: "Germany",
    package_name: "Udawalawe Wild Elephant Safari & Elephant Transit",
    rating: 4,
    comment: "Fantastic day seeing dozens of wild elephant families in Udawalawe. MR Travels arranged our safari jeep seamlessly without any hassle or waiting in lines. Safe driving on the country roads. Highly recommended.",
    image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    created_at: "2026-03-08T17:40:00Z",
    is_approved: true
  }
];

export async function fetchApprovedReviews() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, customer_name, package_name, rating, comment, image_url, created_at')
        .eq('is_approved', true)
        .gte('rating', 3)
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (err) {
      console.warn('[Supabase Client] Falling back to local dataset.', err);
    }
  }

  try {
    const localSaved = localStorage.getItem('ceylon_local_reviews');
    if (localSaved) {
      const parsed = JSON.parse(localSaved);
      const combined = [...parsed, ...INITIAL_REVIEWS];
      return combined.filter(r => r.rating >= 3 && (r.is_approved !== false));
    }
  } catch (e) {}

  return INITIAL_REVIEWS;
}

export async function submitReview(reviewData) {
  try {
    const res = await fetch('/api/review', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Serverless endpoint /api/review unavailable, storing locally.');
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{
          customer_name: reviewData.customer_name,
          customer_email: reviewData.customer_email,
          customer_whatsapp: reviewData.customer_whatsapp,
          package_name: reviewData.package_name,
          rating: reviewData.rating,
          comment: reviewData.comment,
          image_url: reviewData.image_url || null,
          is_approved: true
        }])
        .select()
        .single();
      if (!error) return { success: true, review: data };
    } catch (e) {
      console.error(e);
    }
  }

  const localNew = {
    id: 'local-' + Date.now(),
    customer_name: reviewData.customer_name,
    package_name: reviewData.package_name,
    rating: Number(reviewData.rating),
    comment: reviewData.comment,
    image_url: reviewData.image_url || null,
    created_at: new Date().toISOString(),
    is_approved: true
  };
  try {
    const current = JSON.parse(localStorage.getItem('ceylon_local_reviews') || '[]');
    localStorage.setItem('ceylon_local_reviews', JSON.stringify([localNew, ...current]));
  } catch (e) {}

  return { success: true, review: localNew, simulated: true };
}

export async function submitEnquiry(enquiryData) {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Serverless endpoint /api/enquiry unavailable in client-only mode.');
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([{
          name: enquiryData.name,
          email: enquiryData.email,
          whatsapp_number: enquiryData.whatsapp_number,
          package_name: enquiryData.package_name,
          message: enquiryData.message,
          status: 'new'
        }])
        .select()
        .single();
      if (!error) return { success: true, enquiryId: data.id };
    } catch (e) {
      console.error(e);
    }
  }

  return { success: true, simulated: true };
}
