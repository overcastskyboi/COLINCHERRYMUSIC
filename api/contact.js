import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const LIMITS = { name: 120, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

// Visitor input is dropped into an HTML email, so escape it to prevent markup injection.
const escapeHtml = (str) =>
  str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form: RESEND_API_KEY is not set');
    return res.status(503).json({ error: 'Contact form is temporarily unavailable' });
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return res.status(400).json({ error: 'One or more fields are too long' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Strip line breaks from anything that ends up in a header.
  const safeSubjectName = name.replace(/[\r\n]+/g, ' ');

  try {
    const { error } = await resend.emails.send({
      from: 'Colin Cherry Site <onboarding@resend.dev>',
      to: ['contact@thecolincherry.com'],
      subject: `New EPK Inquiry from ${safeSubjectName}`,
      reply_to: email,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(502).json({ error: 'Failed to send email' });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend Error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
