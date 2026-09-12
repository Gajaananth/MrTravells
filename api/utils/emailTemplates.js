// Email templates for Sri Lanka Tour Company (Brevo integration)

export function getEnquiryOwnerEmail({ name, email, whatsapp_number, package_name, message }) {
  return {
    subject: `🚗 New Tour Enquiry: ${name} - ${package_name || 'Custom Itinerary'}`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f7faf8; margin: 0; padding: 20px; color: #1a2e22; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
          .header { background: linear-gradient(135deg, #0a422a 0%, #062a1c 100%); color: #ffffff; padding: 32px 24px; text-align: center; }
          .header h1 { margin: 0 0 8px; font-size: 24px; letter-spacing: -0.5px; }
          .header p { margin: 0; color: #e5a93c; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
          .body { padding: 32px 24px; }
          .detail-row { margin-bottom: 16px; border-bottom: 1px solid #edf2ef; padding-bottom: 12px; }
          .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; margin-bottom: 4px; }
          .value { font-size: 16px; font-weight: 500; color: #0f172a; }
          .message-box { background: #f8faf9; border-left: 4px solid #0a422a; padding: 16px; border-radius: 4px; font-style: italic; color: #334155; margin-top: 20px; }
          .action-btn { display: inline-block; background: #25D366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin-top: 24px; text-align: center; }
          .footer { background: #f1f5f3; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p>MR Travels & Tours</p>
            <h1>New Traveler Enquiry</h1>
          </div>
          <div class="body">
            <div class="detail-row">
              <div class="label">Customer Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="detail-row">
              <div class="label">Email Address</div>
              <div class="value"><a href="mailto:${email}" style="color: #0a422a;">${email}</a></div>
            </div>
            <div class="detail-row">
              <div class="label">WhatsApp Number</div>
              <div class="value"><a href="https://wa.me/${whatsapp_number.replace(/[^0-9]/g, '')}" style="color: #0a422a;">${whatsapp_number}</a></div>
            </div>
            <div class="detail-row">
              <div class="label">Interested Package</div>
              <div class="value" style="color: #d97706; font-weight: 700;">${package_name || 'Custom Private Tour'}</div>
            </div>
            ${message ? `
            <div class="label" style="margin-top: 16px;">Traveler's Message / Notes</div>
            <div class="message-box">"${message}"</div>
            ` : ''}
            <div style="text-align: center;">
              <a href="https://wa.me/${whatsapp_number.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(name)},%20thank%20you%20for%20reaching%20out%20to%20Ceylon%20Private%20Car%20Tours!" class="action-btn">
                💬 Reply on WhatsApp Now
              </a>
            </div>
          </div>
          <div class="footer">
            Ceylon Private Tours &bull; Instant Lead Notification
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function getLowReviewOwnerAlert({ customer_name, customer_email, customer_whatsapp, package_name, rating, comment }) {
  return {
    subject: `⚠️ URGENT: Low Review (${rating}/5) Received - Follow Up Needed`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #fef2f2; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 2px solid #ef4444; }
          .header { background: #dc2626; color: #ffffff; padding: 24px; text-align: center; }
          .body { padding: 24px; }
          .warning-badge { background: #fee2e2; color: #b91c1c; padding: 8px 16px; border-radius: 20px; font-weight: 700; display: inline-block; font-size: 14px; margin-bottom: 16px; }
          .comment-box { background: #fef2f2; border-left: 4px solid #ef4444; padding: 16px; border-radius: 4px; font-size: 15px; color: #7f1d1d; margin: 16px 0; }
          .btn { display: inline-block; background: #dc2626; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 22px;">⚠️ Low Review Alert (${rating}/5 Stars)</h1>
          </div>
          <div class="body">
            <div class="warning-badge">Immediate Action Recommended</div>
            <p>A customer has submitted a review with ${rating} out of 5 stars for <strong>${package_name || 'Tour'}</strong>.</p>
            <p><strong>Customer:</strong> ${customer_name}</p>
            <p><strong>Email:</strong> <a href="mailto:${customer_email}">${customer_email}</a></p>
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/${customer_whatsapp.replace(/[^0-9]/g, '')}">${customer_whatsapp}</a></p>
            <div class="comment-box">
              <strong>Customer Feedback:</strong><br/>
              "${comment || 'No written comment provided.'}"
            </div>
            <p>Please reach out directly to resolve their concerns and maintain our 5-star reputation.</p>
            <div style="text-align: center; margin-top: 24px;">
              <a href="https://wa.me/${customer_whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(customer_name)},%20I%20saw%20your%20feedback%20regarding%20our%20tour.%20I%20sincerely%20apologize%20and%20would%20love%20to%20speak%20with%20you%20directly." class="btn">
                Contact Customer on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function getLowReviewCustomerApology({ customer_name, package_name }) {
  return {
    subject: `We're truly sorry your experience wasn't what you hoped for - Ceylon Tours`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8faf9; margin: 0; padding: 20px; color: #2d3748; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
          .header { background: #0a422a; color: #ffffff; padding: 28px 24px; text-align: center; }
          .body { padding: 32px 24px; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; font-size: 22px;">MR Travels & Tours</h2>
          </div>
          <div class="body">
            <p>Dear ${customer_name},</p>
            <p>Thank you for taking the time to share your feedback about your ${package_name ? `experience on the ${package_name}` : 'recent tour with us'}.</p>
            <p>We are genuinely sorry to hear that your experience did not meet expectations. As a family-run, dedicated private tour service, we take every journey to heart and pride ourselves on unforgettable Sri Lankan adventures.</p>
            <p>We want to make this right. Our owner will reach out to you personally to understand how we can improve and ensure we do better.</p>
            <p>Warm regards,<br><strong>MR Travels & Tours</strong></p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function getMidReviewCustomerEmail({ customer_name, package_name }) {
  return {
    subject: `Thank you for your feedback! - Ceylon Tours`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f8faf9; margin: 0; padding: 20px; color: #2d3748; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; }
          .header { background: #0a422a; color: #ffffff; padding: 28px 24px; text-align: center; }
          .body { padding: 32px 24px; line-height: 1.6; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2 style="margin: 0; font-size: 22px;">MR Travels & Tours</h2>
          </div>
          <div class="body">
            <p>Dear ${customer_name},</p>
            <p>Thank you for your valuable review on our ${package_name || 'tour service'}.</p>
            <p>We are always working to elevate our service and make each day tour through Sri Lanka as seamless and scenic as possible. Your feedback helps us continually refine our private routes, stops, and driver hospitality.</p>
            <p>We hope to welcome you back to the pearl of the Indian Ocean soon!</p>
            <p>Warm regards,<br><strong>MR Travels & Tours</strong></p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

export function getHighReviewCustomerEmail({ customer_name, package_name }) {
  return {
    subject: `🌟 Thank you for traveling with us, ${customer_name}! - Ceylon Tours`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #f4fbf7; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
          .header { background: linear-gradient(135deg, #0a422a 0%, #115e3b 100%); color: #ffffff; padding: 36px 24px; text-align: center; }
          .body { padding: 32px 24px; line-height: 1.6; }
          .highlight { background: #fef3c7; color: #92400e; padding: 12px 18px; border-radius: 8px; font-weight: 600; margin: 20px 0; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0 0 8px; font-size: 26px;">Ayubowan & Thank You! 🌴</h1>
            <p style="margin: 0; color: #fcd34d; font-size: 14px;">CEYLON PRIVATE CAR TOURS</p>
          </div>
          <div class="body">
            <p>Dear ${customer_name},</p>
            <p>We are thrilled that you had such a fantastic experience exploring Sri Lanka with us${package_name ? ` on the ${package_name}` : ''}!</p>
            <div class="highlight">
              ✨ Your 5-star feedback means the world to our small private tour family.
            </div>
            <p>Sharing our beautiful island—from misty highland tea estates to ancient fortresses and tropical coastlines—is our greatest passion. Knowing you loved the journey inspires us every day.</p>
            <p>If your friends or family ever plan a trip to Sri Lanka, please feel free to connect them with us!</p>
            <p>Wishing you many more happy travels across the world,<br><strong>MR Travels & Tours</strong></p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}
