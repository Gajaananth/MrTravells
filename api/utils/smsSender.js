// text.lk SMS API Gateway Utility

export async function sendTextLkSMS({ recipientPhone, message }) {
  const apiKey = process.env.TEXTLK_API_KEY;
  const senderId = process.env.TEXTLK_SENDER_ID || 'CEYLONTOURS';

  // Format recipient: international format without leading + or symbols
  const formattedPhone = String(recipientPhone || '').replace(/[^0-9]/g, '');

  if (!apiKey || apiKey === 'your-textlk-api-key') {
    console.warn(`[text.lk Mock] Missing TEXTLK_API_KEY. Simulated SMS to: ${formattedPhone} | Message: "${message}"`);
    return { success: true, mocked: true };
  }

  try {
    const response = await fetch('https://app.text.lk/api/v3/sms/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        recipient: formattedPhone,
        sender_id: senderId,
        message: message
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error('[text.lk Error]', response.status, data);
      return { success: false, error: data.message || `HTTP ${response.status}` };
    }

    return { success: true, data };
  } catch (err) {
    console.error('[text.lk Exception]', err.message);
    return { success: false, error: err.message };
  }
}
