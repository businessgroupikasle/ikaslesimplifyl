import nodemailer from 'nodemailer';

// Visitor-supplied text is placed inside an HTML email, so escape it first.
const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

// ── Visitor confirmation email ────────────────────────────────────────────

// The chatbot form has no real email field and submits a placeholder address.
const PLACEHOLDER_EMAIL_DOMAIN = /@chatbot-enquiry\.simplifyl\.com$/i;

function shouldSendConfirmation(visitorEmail) {
  if (!visitorEmail || typeof visitorEmail !== 'string') return false;
  const clean = visitorEmail.trim();
  if (!clean || PLACEHOLDER_EMAIL_DOMAIN.test(clean)) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean);
}

function buildConfirmationEmail({
  smtpUser,
  recipientEmail,
  visitorEmail,
  contactName,
  phone,
  service,
  businessName,
  message,
  formattedTime
}) {
  const name = contactName || 'there';
  const safeName = escapeHtml(name);
  const safeService = escapeHtml(service || 'General Consultation');
  const safePhone = escapeHtml(phone || 'Not provided');
  const safeBusiness = escapeHtml(businessName || '');
  const safeMessage = escapeHtml(message || '');

  return {
    from: `"Simplifyl Compliance Solutions" <${smtpUser}>`,
    to: visitorEmail,
    replyTo: recipientEmail,
    subject: `Thank You for Your Enquiry | Simplifyl Compliance Solutions`,
    text: `
Dear ${name},

Thank you for contacting Simplifyl Compliance Solutions!

We have successfully received your enquiry regarding ${service || 'our services'}. Our specialized compliance and tax advisory team is reviewing your requirements and will reach out to you within 1 business day.

--- SUMMARY OF YOUR ENQUIRY ---
• Service Requested: ${service || 'General Advisory'}
• Full Name: ${name}
• Contact Phone: ${phone || 'Not provided'}
• Email: ${visitorEmail}
${businessName ? `• Business / Entity: ${businessName}\n` : ''}${message ? `• Your Message: ${message}\n` : ''}• Submitted On: ${formattedTime} (IST)

--- NEED IMMEDIATE ASSISTANCE? ---
If you need urgent support or have any questions, feel free to contact us directly:
• Phone / WhatsApp: +91 78451 32962
• Email: ${recipientEmail}
• Business Hours: Monday to Saturday, 9:30 AM to 6:30 PM IST
• Office Address: 1639/ A, 2nd Floor, Hopes, Coimbatore, India - 641004

Warm regards,
Simplifyl Compliance Solutions Advisory Desk
https://simplifyl.com

(This is an automated confirmation acknowledging your enquiry. If you did not make this request, please safely ignore this email.)
    `.trim(),
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F8FAFC; color: #1E293B; margin: 0; padding: 24px; }
    .card { max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 14px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 16px rgba(16, 54, 78, 0.06); }
    .header { background: #10364E; padding: 32px; color: #ffffff; text-align: left; }
    .header .badge { display: inline-block; background: rgba(255, 255, 255, 0.12); color: #92C6E7; padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; line-height: 1.3; }
    .header p { margin: 8px 0 0; font-size: 13px; color: #92C6E7; }
    .body { padding: 32px; font-size: 15px; line-height: 1.6; color: #334155; }
    .greeting { font-size: 17px; font-weight: 700; color: #10364E; margin-bottom: 12px; }
    .summary-card { background: #F4F8FB; border: 1px solid #E3EFF8; border-radius: 10px; padding: 20px; margin: 24px 0; }
    .summary-card h3 { margin: 0 0 14px 0; font-size: 13px; font-weight: 700; color: #10364E; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #E3EFF8; padding-bottom: 8px; }
    .row { display: flex; margin-bottom: 10px; }
    .row:last-child { margin-bottom: 0; }
    .label { width: 140px; font-size: 12px; font-weight: 600; color: #64748B; text-transform: uppercase; letter-spacing: 0.04em; }
    .val { flex: 1; font-size: 14px; font-weight: 600; color: #0F172A; }
    .service-pill { display: inline-block; background: #1C6FA5; color: #ffffff; padding: 2px 10px; border-radius: 9999px; font-size: 12px; font-weight: 600; }
    .contact-box { background: #F8FAFC; border-left: 3px solid #1C6FA5; padding: 16px 20px; border-radius: 6px; margin: 24px 0; font-size: 14px; }
    .contact-box h4 { margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #10364E; }
    .contact-box a { color: #1C6FA5; font-weight: 600; text-decoration: none; }
    .signoff { margin-top: 24px; font-size: 14px; color: #475569; }
    .signoff strong { color: #10364E; }
    .footer { background: #F1F5F9; padding: 18px 32px; font-size: 12px; color: #64748B; text-align: center; line-height: 1.5; border-top: 1px solid #E2E8F0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">Confirmation &amp; Acknowledgement</span>
      <h1>Thank You, ${safeName}!</h1>
      <p>We have received your enquiry | Simplifyl Compliance Solutions</p>
    </div>
    <div class="body">
      <div class="greeting">Dear ${safeName},</div>
      <p>
        Thank you for contacting <strong>Simplifyl Compliance Solutions</strong>. We have successfully registered your enquiry regarding <strong>${safeService}</strong>.
      </p>
      <p>
        Our dedicated compliance and tax advisory team is reviewing your requirements and will connect with you within <strong>1 business day</strong> to discuss the next steps.
      </p>

      <div class="summary-card">
        <h3>Summary of Your Enquiry</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; width: 140px; color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase;">Service</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0F172A;"><span class="service-pill">${safeService}</span></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase;">Full Name</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0F172A;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase;">Phone</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0F172A;">${safePhone}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase;">Email</td>
            <td style="padding: 6px 0; font-weight: 600; color: #0F172A;">${escapeHtml(visitorEmail)}</td>
          </tr>
          ${
            safeBusiness
              ? `<tr>
                  <td style="padding: 6px 0; color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase;">Business</td>
                  <td style="padding: 6px 0; font-weight: 600; color: #0F172A;">${safeBusiness}</td>
                </tr>`
              : ''
          }
          ${
            safeMessage
              ? `<tr>
                  <td style="padding: 6px 0; vertical-align: top; color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase;">Message</td>
                  <td style="padding: 6px 0; font-weight: 500; color: #334155; line-height: 1.5;">${safeMessage.replace(/\n/g, '<br/>')}</td>
                </tr>`
              : ''
          }
          <tr>
            <td style="padding: 6px 0; color: #64748B; font-weight: 600; font-size: 12px; text-transform: uppercase;">Submitted On</td>
            <td style="padding: 6px 0; font-weight: 500; color: #64748B;">${escapeHtml(formattedTime)} (IST)</td>
          </tr>
        </table>
      </div>

      <div class="contact-box">
        <h4>Need immediate assistance?</h4>
        <p style="margin: 4px 0 0; line-height: 1.6;">
          Phone / WhatsApp: <a href="tel:+917845132962">+91 78451 32962</a><br/>
          Direct Email: <a href="mailto:${escapeHtml(recipientEmail)}">${escapeHtml(recipientEmail)}</a><br/>
          Office Hours: Monday &ndash; Saturday, 9:30 AM to 6:30 PM IST<br/>
          Address: 1639/ A, 2nd Floor, Hopes, Coimbatore, Tamil Nadu, India - 641004
        </p>
      </div>

      <div class="signoff">
        Warm regards,<br/>
        <strong>Simplifyl Compliance Solutions Advisory Desk</strong><br/>
        <span style="font-size: 12px; color: #64748B;">Simplifying Business, GST, and IP Compliances</span>
      </div>
    </div>
    <div class="footer">
      This is an automated confirmation email sent to <strong>${escapeHtml(visitorEmail)}</strong>.<br/>
      If you did not submit this enquiry on simplifyl.com, please safely disregard this email.
    </div>
  </div>
</body>
</html>
    `.trim()
  };
}

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

    // Single line, bounded length: this ends up in email subjects and greetings
    const contactName = (fullName || name || '').replace(/[\r\n\t]+/g, ' ').trim().slice(0, 80);
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

    // ── Dispatch Emails to Receiver and Sender in Parallel ──
    const visitorEmail = email.trim();
    const canSendConfirmation = shouldSendConfirmation(visitorEmail);

    // Prepare dispatch tasks
    const emailTasks = [
      transporter.sendMail(mailOptions)
    ];

    if (canSendConfirmation) {
      emailTasks.push(
        transporter.sendMail(
          buildConfirmationEmail({
            smtpUser,
            recipientEmail,
            visitorEmail,
            contactName,
            phone,
            service,
            businessName,
            message,
            formattedTime
          })
        )
      );
    }

    const [adminOutcome, visitorOutcome] = await Promise.allSettled(emailTasks);

    const deliveredToAdmin = adminOutcome.status === 'fulfilled';
    const confirmationSent = canSendConfirmation && visitorOutcome?.status === 'fulfilled';

    if (!deliveredToAdmin) {
      console.error('[Simplifyl SMTP] Admin email delivery failed:', adminOutcome.reason);
    }
    if (canSendConfirmation && !confirmationSent) {
      console.error('[Simplifyl SMTP] Sender thank-you email failed:', visitorOutcome?.reason);
    }

    // If both failed, throw error
    if (!deliveredToAdmin && !confirmationSent) {
      throw new Error(adminOutcome.reason?.message || visitorOutcome?.reason?.message || 'SMTP dispatch failed');
    }

    return res.status(200).json({
      success: true,
      delivered: deliveredToAdmin,
      confirmationSent,
      adminMessageId: deliveredToAdmin ? adminOutcome.value?.messageId : null,
      confirmationMessageId: confirmationSent ? visitorOutcome?.value?.messageId : null,
      recipient: recipientEmail,
      sender: visitorEmail,
      message: deliveredToAdmin && confirmationSent
        ? 'Enquiry sent to receiver and thank-you confirmation sent to sender.'
        : deliveredToAdmin
          ? 'Enquiry sent to receiver.'
          : 'Thank-you confirmation sent to sender.'
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

