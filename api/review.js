// Vercel Serverless Function: /api/review.js
import { getSupabaseServerClient } from './utils/supabaseServer.js';
import { sendBrevoEmail } from './utils/brevoSender.js';
import { sendTextLkSMS } from './utils/smsSender.js';
import {
  getLowReviewOwnerAlert,
  getLowReviewCustomerApology,
  getMidReviewCustomerEmail,
  getHighReviewCustomerEmail
} from './utils/emailTemplates.js';

export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const {
      customer_name,
      customer_email,
      customer_whatsapp,
      package_name,
      rating,
      comment,
      image_base64,
      image_name,
      image_url: providedImageUrl
    } = req.body || {};

    if (!customer_name || !customer_email || !customer_whatsapp || !rating) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, whatsapp, and rating (1-5) are mandatory.'
      });
    }

    const numericRating = Math.max(1, Math.min(5, parseInt(rating, 10) || 5));
    const cleanName = String(customer_name).trim();
    const cleanEmail = String(customer_email).trim().toLowerCase();
    const cleanWhatsApp = String(customer_whatsapp).trim();
    const cleanPackage = package_name ? String(package_name).trim() : 'Sri Lanka Tour Experience';
    const cleanComment = comment ? String(comment).trim() : '';

    const supabase = getSupabaseServerClient();
    let finalImageUrl = providedImageUrl || null;

    // 1. Optional Image upload to Supabase Storage bucket 'review-images'
    if (supabase && image_base64 && !finalImageUrl) {
      try {
        const base64Data = image_base64.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        const fileExt = (image_name && image_name.split('.').pop()) || 'jpg';
        const fileName = `review-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('review-images')
          .upload(fileName, buffer, {
            contentType: `image/${fileExt === 'png' ? 'png' : 'jpeg'}`,
            upsert: false
          });

        if (!uploadError && uploadData) {
          const { data: publicUrlData } = supabase.storage
            .from('review-images')
            .getPublicUrl(fileName);
          finalImageUrl = publicUrlData?.publicUrl || null;
        } else if (uploadError) {
          console.error('[Supabase Storage Upload Error]', uploadError);
        }
      } catch (storageErr) {
        console.error('[Storage Upload Exception]', storageErr);
      }
    }

    // 2. Insert into Supabase reviews table
    let reviewRecord = null;
    if (supabase) {
      const { data, error: dbError } = await supabase
        .from('reviews')
        .insert([
          {
            customer_name: cleanName,
            customer_email: cleanEmail,
            customer_whatsapp: cleanWhatsApp,
            package_name: cleanPackage,
            rating: numericRating,
            comment: cleanComment,
            image_url: finalImageUrl,
            is_approved: true // default approved or manual moderation per owner policy
          }
        ])
        .select('id, customer_name, package_name, rating, comment, image_url, created_at')
        .single();

      if (dbError) {
        console.error('[Supabase Review Insert Error]', dbError);
      } else {
        reviewRecord = data;
      }
    }

    // 3. Conditional Branching by Rating (Brevo Email & text.lk SMS)
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@ceylontours.com';
    const ownerPhone = process.env.OWNER_PHONE || '94771234567';

    if (numericRating === 1 || numericRating === 2) {
      // Urgent Owner Notification
      const ownerEmailPayload = getLowReviewOwnerAlert({
        customer_name: cleanName,
        customer_email: cleanEmail,
        customer_whatsapp: cleanWhatsApp,
        package_name: cleanPackage,
        rating: numericRating,
        comment: cleanComment
      });

      await sendBrevoEmail({
        toEmail: ownerEmail,
        toName: 'Tour Owner (Urgent)',
        subject: ownerEmailPayload.subject,
        htmlContent: ownerEmailPayload.htmlContent
      });

      await sendTextLkSMS({
        recipientPhone: ownerPhone,
        message: `⚠️ URGENT Low Review (${numericRating}/5) from ${cleanName}: "${cleanComment.substring(0, 50)}...". WA: ${cleanWhatsApp}`
      });

      // Customer Apologetic Message
      const customerApologyPayload = getLowReviewCustomerApology({
        customer_name: cleanName,
        package_name: cleanPackage
      });

      await sendBrevoEmail({
        toEmail: cleanEmail,
        toName: cleanName,
        subject: customerApologyPayload.subject,
        htmlContent: customerApologyPayload.htmlContent
      });

      await sendTextLkSMS({
        recipientPhone: cleanWhatsApp,
        message: `Dear ${cleanName}, we're sorry your tour wasn't what you hoped for. Our owner will reach out to you personally to make this right.`
      });

    } else if (numericRating === 3) {
      // Rating 3: Improvement Feedback
      const customerEmailPayload = getMidReviewCustomerEmail({
        customer_name: cleanName,
        package_name: cleanPackage
      });

      await sendBrevoEmail({
        toEmail: cleanEmail,
        toName: cleanName,
        subject: customerEmailPayload.subject,
        htmlContent: customerEmailPayload.htmlContent
      });

      await sendTextLkSMS({
        recipientPhone: cleanWhatsApp,
        message: `Hi ${cleanName}, thank you for your feedback on Ceylon Tours! We're always working hard to improve our service.`
      });

    } else if (numericRating >= 4) {
      // Rating 4 or 5: Warm appreciation & thank you
      const customerEmailPayload = getHighReviewCustomerEmail({
        customer_name: cleanName,
        package_name: cleanPackage
      });

      await sendBrevoEmail({
        toEmail: cleanEmail,
        toName: cleanName,
        subject: customerEmailPayload.subject,
        htmlContent: customerEmailPayload.htmlContent
      });

      await sendTextLkSMS({
        recipientPhone: cleanWhatsApp,
        message: `Ayubowan ${cleanName}! Thank you for traveling with Ceylon Private Tours and for your 5-star review! We loved hosting you.`
      });
    }

    // Public sanitized return (NEVER expose email or WhatsApp)
    return res.status(200).json({
      success: true,
      message: 'Thank you for your valuable review!',
      review: {
        id: reviewRecord ? reviewRecord.id : 'simulated-' + Date.now(),
        customer_name: cleanName,
        package_name: cleanPackage,
        rating: numericRating,
        comment: cleanComment,
        image_url: finalImageUrl,
        created_at: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('[Review API Exception]', error);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while saving your review.'
    });
  }
}
