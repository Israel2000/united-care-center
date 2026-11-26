// Vercel serverless function: POST /api/send
// Sends the United Care Center contact form via Resend to the owner.
// Requires RESEND_API_KEY set in Vercel (Production). No key is in this file.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Email service is not configured (RESEND_API_KEY is missing).' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { return res.status(400).json({ error: 'Invalid request.' }); }
  }
  if (!body || typeof body !== 'object') {
    return res.status(400).json({ error: 'Invalid request.' });
  }

  const name = String(body.name || '').trim();
  const phone = String(body.phone || '').trim();
  const email = String(body.email || '').trim();
  const service = String(body.service || '').trim();
  const message = String(body.message || '').trim();

  const services = [
    'Home & Personal Support Services',
    'Respite Care',
    'Community-Based Skill Building & Social Support',
    'Non-Medical (NMT) Transportation',
    'Something else / Not sure yet',
  ];

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({ error: 'Please enter your full name.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  if (phone.length > 30) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }
  if (!services.includes(service)) {
    return res.status(400).json({ error: 'Please choose a service.' });
  }
  if (message.length < 10 || message.length > 1500) {
    return res.status(400).json({ error: 'Please write a message of at least 10 characters.' });
  }

  const text =
    'Name: ' + name + '\n' +
    (phone ? 'Phone: ' + phone + '\n' : '') +
    'Email: ' + email + '\n' +
    'Interested in: ' + service + '\n\n' +
    message;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'United Care Center <onboarding@resend.dev>',
        // For now: send to the owner only (Resend onboarding domain only
        // allows the account owner's email). Switch to the client address
        // after a domain is verified in Resend.
        to: ['ibelete2000@gmail.com'],
        reply_to: email,
        subject: 'Website inquiry — ' + service + ' — ' + name,
        text: text,
      }),
    });

    if (!response.ok) {
      let detail = '';
      try {
        const data = await response.json();
        detail = data && (data.message || data.error || data.name) ? String(data.message || data.error || data.name) : '';
      } catch {}
      return res.status(502).json({ error: detail ? 'Email could not be sent: ' + detail : 'Email could not be sent. Please try again or call (303) 335-7064.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(502).json({ error: 'Email could not be sent. Please try again or call (303) 335-7064.' });
  }
};
