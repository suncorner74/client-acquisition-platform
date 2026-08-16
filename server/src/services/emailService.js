const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (process.env.SMTP_USER && process.env.SMTP_USER !== 'your-email@gmail.com') {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });
  }
  return null;
};

const sendLeadNotificationEmails = async (lead) => {
  const transporter = createTransporter();

  const adminEmailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
      <h2 style="color: #06b6d4;">🚀 New Project Idea Received via Sunvix!</h2>
      <p>A new client has submitted their project details via your Sunvix acquisition platform:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Client Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.name}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.phone || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.company || 'N/A'}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Project Type:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.projectType}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Budget Range:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #16a34a; font-weight: bold;">${lead.budget}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Timeline:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.timeline}</td></tr>
        <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Source:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${lead.source}</td></tr>
      </table>

      <div style="background-color: #f8fafc; padding: 15px; border-left: 4px solid #06b6d4; margin: 15px 0;">
        <h4 style="margin: 0 0 10px 0;">Project Idea Description:</h4>
        <p style="margin: 0; white-space: pre-wrap;">${lead.message}</p>
      </div>

      <p style="margin-top: 20px;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/admin/dashboard" style="background-color: #06b6d4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Open Sunvix CRM</a>
      </p>
    </div>
  `;

  const clientEmailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; color: #333; line-height: 1.6;">
      <h2 style="color: #06b6d4;">Thank you for sharing your project idea with Sunvix, ${lead.name}!</h2>
      <p>Your project enquiry has been successfully received by the Sunvix team. We're excited to review your requirements and discuss how we can bring your idea to life.</p>
      
      <div style="background-color: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin: 0 0 8px 0; color: #166534;">Next Steps with Sunvix:</h4>
        <ol style="margin: 0; padding-left: 20px; color: #15803d;">
          <li>Technical review of your project specifications (${lead.projectType}).</li>
          <li>Scope & timeline estimate matching your target budget (${lead.budget}).</li>
          <li>Our Lead Technology Architect will contact you within 24 hours.</li>
        </ol>
      </div>

      <p>If you have any supplementary materials or links to share, feel free to reply directly to this email.</p>

      <p style="margin-top: 30px; font-weight: bold;">
        Best regards,<br/>
        <span style="color: #06b6d4;">Sunvix Engineering Team</span><br/>
        Lead Architect: Suraj Kumar
      </p>
    </div>
  `;

  if (!transporter) {
    console.log('\n---------------- [MOCK EMAIL SERVICE LOG] ----------------');
    console.log(`[Developer Notification Alert Sent To]: ${process.env.ADMIN_EMAIL || 'surajkumarmca1993@gmail.com'}`);
    console.log(`[Lead Client]: ${lead.name} (${lead.email}) | ${lead.projectType} | ${lead.budget}`);
    console.log(`[Client Confirmation Sent To]: ${lead.email}`);
    console.log('-----------------------------------------------------------\n');
    return { success: true, mock: true };
  }

  try {
    // Send email to Developer
    await transporter.sendMail({
      from: process.env.CLIENT_EMAIL_FROM || '"Sunvix Lead System" <no-reply@sunvix.com>',
      to: process.env.ADMIN_EMAIL || 'surajkumarmca1993@gmail.com',
      subject: `🚨 New Sunvix Lead: ${lead.name} (${lead.projectType})`,
      html: adminEmailContent
    });

    // Send acknowledgement to Client
    await transporter.sendMail({
      from: process.env.CLIENT_EMAIL_FROM || '"Sunvix Software" <no-reply@sunvix.com>',
      to: lead.email,
      subject: `Sunvix Project Enquiry Received - Let's build something great!`,
      html: clientEmailContent
    });

    console.log(`[Email Service] Notification & Confirmation sent for lead: ${lead.email}`);
    return { success: true, mock: false };
  } catch (error) {
    console.error(`[Email Service Error] Failed to send email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendLeadNotificationEmails
};
