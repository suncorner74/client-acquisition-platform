import nodemailer from 'nodemailer'

export async function sendLeadEmails(lead) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
  })

  const summary = `
Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone || '-'}
Company: ${lead.company || '-'}
Project: ${lead.projectType}
Budget: ${lead.budget}
Timeline: ${lead.timeline}
Source: ${lead.source || '-'}
Message:
${lead.message}
`

  await transporter.sendMail({
    from: process.env.CLIENT_EMAIL_FROM || process.env.SMTP_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New project enquiry from ${lead.name}`,
    text: summary
  })

  await transporter.sendMail({
    from: process.env.CLIENT_EMAIL_FROM || process.env.SMTP_USER,
    to: lead.email,
    subject: 'Your project enquiry has been received',
    text: `Hi ${lead.name},\n\nThank you! Your project enquiry has been received. I'll get back to you shortly.\n\nBest regards`
  })
}
