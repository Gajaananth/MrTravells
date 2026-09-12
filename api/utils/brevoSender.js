// Brevo Transactional Email Sender Utility

export async function sendBrevoEmail({ toEmail, toName, subject, htmlContent }) {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'tours@ceylontours.com';
  const senderName = 'MR Travels & Tours';

  if (!apiKey || apiKey === 'your-brevo-api-key') {
    console.warn(`[Brevo Mock] Missing BREVO_API_KEY. Simulated email to: ${toEmail} | Subject: "${subject}"`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
      body: JSON.stringify({
        sender: {
          name: senderName,
          email: senderEmail
        },
        to: [
          {
            email: toEmail,
            name: toName || toEmail
          }
        ],
        subject: subject,
        htmlContent: htmlContent
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('[Brevo Error]', response.status, data);
      return { success: false, error: data.message || `HTTP ${response.status}` };
    }

    return { success: true, messageId: data.messageId };
  } catch (err) {
    console.error('[Brevo Exception]', err.message);
    return { success: false, error: err.message };
  }
}
