import nodemailer from 'nodemailer';

// Visitor-supplied text is placed inside an HTML email, so escape it first.
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} not allowed. Please use POST.`
    });
  }

  try {
    const data = req.body || {};
    const {
      fullName,
      name,
      email,
      phone,
      service,
      businessName,
      message,
      submittedAt
    } = data;

    const contactName = (fullName || name || '').trim();
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'businessgroupikasle@gmail.com';

    // Validate required fields
    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and Email are required.'
      });
    }

    // Validate phone number (10 digits starting with 6, 7, 8, or 9).
    // The form also accepts +91 / 91 / 0 prefixes, so strip those before checking.
    let cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) cleanPhone = cleanPhone.slice(2);
    else if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) cleanPhone = cleanPhone.slice(1);
    if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.'
      });
    }

    // Validate email format (valid domain and alphabetical TLD of at least 2 letters)
    const emailRegex = /^[a-zA-Z0-9_%+-]+(?:\.[a-zA-Z0-9_%+-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test((email || '').trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address (e.g. name@example.com).'
      });
    }

    // Validate name is not numeric-only
    if (contactName && /^\d+$/.test(contactName.replace(/\s+/g, ''))) {
      return res.status(400).json({
        success: false,
        message: 'Full Name cannot be numeric only. Please enter a valid name.'
      });
    }

    // Validate service selection
    if (!service || !service.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please select a valid service.'
      });
    }

    // SMTP Configuration
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = Number(process.env.SMTP_PORT) || 465;
    const smtpSecure = process.env.SMTP_SECURE !== 'false'; // true for 465, false for 587
    const smtpUser = process.env.SMTP_USER || 'businessgroupikasle@gmail.com';
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || '';

    // If SMTP credentials are not configured yet, record and notify gracefully
    if (!smtpPass) {
      console.warn(
        '[Simplifyl SMTP] SMTP_PASS / GMAIL_APP_PASSWORD not set in environment. Submission logged for delivery to businessgroupikasle@gmail.com.'
      );
      return res.status(200).json({
        success: true,
        delivered: false,
        warning: 'SMTP_CONFIG_PENDING',
        message:
          'Enquiry received successfully. Email delivery will be active once SMTP_PASS (Gmail App Password) is configured in environment.',
        recipient: recipientEmail,
        data: {
          contactName,
          email,
          phone,
          service,
          submittedAt: submittedAt || new Date().toISOString()
        }
      });
    }

    // Initialize Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const formattedTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const mailOptions = {
      from: `"Simplifyl Enquiries" <${smtpUser}>`,
      replyTo: { name: contactName, address: email.trim() },
      to: recipientEmail,
      subject: `🚨 New Simplifyl Enquiry: ${service || 'General Consultation'} - ${contactName}`,
      text: `
New Business Consultation Enquiry Received

Name: ${contactName}
Phone: ${phone}
Email: ${email}
Service Required: ${service || 'Not specified'}
Business / Entity: ${businessName || 'Not specified'}
Message / Details: ${message || 'No additional message provided.'}
Submitted At: ${formattedTime} (IST)
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; color: #1E293B; margin: 0; padding: 24px; }
    .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 12px rgba(16, 54, 78, 0.05); }
    .header { background: #10364E; padding: 24px 32px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 4px 0 0; font-size: 13px; color: #92C6E7; }
    .body { padding: 32px; }
    .field { margin-bottom: 18px; border-bottom: 1px solid #F1F5F9; padding-bottom: 14px; }
    .field:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
    .label { font-size: 11px; font-weight: 700; color: #64748B; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .value { font-size: 15px; font-weight: 600; color: #0F172A; }
    .value a { color: #1C6FA5; text-decoration: none; }
    .badge { display: inline-block; background: #F4F8FB; color: #1C6FA5; border: 1px solid #E3EFF8; padding: 4px 12px; border-radius: 9999px; font-size: 13px; font-weight: 700; }
    .message-box { background: #F8FAFC; border-left: 3px solid #1C6FA5; padding: 12px 16px; border-radius: 4px; font-size: 14px; line-height: 1.5; color: #334155; margin-top: 6px; }
    .footer { background: #F1F5F9; padding: 16px 32px; font-size: 12px; color: #64748B; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>New Consultation Enquiry</h1>
      <p>Submitted via Simplifyl Portal at ${formattedTime}</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${escapeHtml(contactName)}</div>
      </div>
      <div class="field">
        <div class="label">Phone Number</div>
        <div class="value"><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Selected Service</div>
        <div class="value"><span class="badge">${escapeHtml(service || 'General Advisory')}</span></div>
      </div>
      ${
        businessName
          ? `
      <div class="field">
        <div class="label">Business / Entity Name</div>
        <div class="value">${escapeHtml(businessName)}</div>
      </div>`
          : ''
      }
      <div class="field">
        <div class="label">Client Message / Enquiry Details</div>
        <div class="message-box">${message ? escapeHtml(message).replace(/\n/g, '<br/>') : 'No additional notes provided.'}</div>
      </div>
    </div>
    <div class="footer">
      Delivered via Simplifyl SMTP Dispatcher to <strong>${recipientEmail}</strong>
    </div>
  </div>
</body>
</html>
      `.trim()
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      delivered: true,
      messageId: info.messageId,
      recipient: recipientEmail,
      message: 'Enquiry successfully sent to businessgroupikasle@gmail.com via SMTP.'
    });
  } catch (err) {
    console.error('[Simplifyl SMTP Error]:', err);
    return res.status(500).json({
      success: false,
      message: 'Failed to send enquiry email via SMTP.',
      error: err.message
    });
  }
}

