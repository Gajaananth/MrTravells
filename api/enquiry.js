// Vercel Serverless Function: /api/enquiry.js
import { getSupabaseServerClient } from './utils/supabaseServer.js';
import { sendBrevoEmail } from './utils/brevoSender.js';
import { sendTextLkSMS } from './utils/smsSender.js';
import { getEnquiryOwnerEmail } from './utils/emailTemplates.js';

export default async function handler(req, res) {
  // CORS support
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
    const { name, email, whatsapp_number, package_name, message } = req.body || {};

    if (!name || !email || !whatsapp_number) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, and whatsapp_number are mandatory.'
      });
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanWhatsApp = String(whatsapp_number).trim();
    const cleanPackage = package_name ? String(package_name).trim() : 'Custom Sri Lanka Tour';
    const cleanMessage = message ? String(message).trim() : '';

    // 1. Insert into Supabase enquiries table
    const supabase = getSupabaseServerClient();
    let dbRecord = null;

    if (supabase) {
      const { data, error: dbError } = await supabase
        .from('enquiries')
        .insert([
          {
            name: cleanName,
            email: cleanEmail,
            whatsapp_number: cleanWhatsApp,
            package_name: cleanPackage,
            message: cleanMessage,
            status: 'new'
          }
        ])
        .select()
        .single();

      if (dbError) {
        console.error('[Supabase Enquiry Insert Error]', dbError);
      } else {
        dbRecord = data;
      }
    } else {
      console.log('[Supabase Mock] Supabase credentials not configured. Enquiry stored in local simulation.');
    }

    // 2. Trigger Brevo Email to Owner
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@ceylontours.com';
    const emailPayload = getEnquiryOwnerEmail({
      name: cleanName,
      email: cleanEmail,
      whatsapp_number: cleanWhatsApp,
      package_name: cleanPackage,
      message: cleanMessage
    });

    const emailResult = await sendBrevoEmail({
      toEmail: ownerEmail,
      toName: 'Tour Operator Owner',
      subject: emailPayload.subject,
      htmlContent: emailPayload.htmlContent
    });

    // 3. Trigger text.lk SMS to Owner Phone
    const ownerPhone = process.env.OWNER_PHONE || '94771234567';
    const smsMessage = `New enquiry from ${cleanName} - ${cleanPackage} - Call/WA: ${cleanWhatsApp}`;
    const smsResult = await sendTextLkSMS({
      recipientPhone: ownerPhone,
      message: smsMessage
    });

    return res.status(200).json({
      success: true,
      message: "Thanks, we'll contact you shortly!",
      enquiryId: dbRecord ? dbRecord.id : 'simulated-' + Date.now(),
      notifications: {
        email: emailResult.success,
        sms: smsResult.success
      }
    });
  } catch (error) {
    console.error('[Enquiry API Exception]', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your enquiry. Please reach out to us on WhatsApp directly.'
    });
  }
}
