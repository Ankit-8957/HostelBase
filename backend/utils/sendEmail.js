import nodemailer from "nodemailer";
import { transport } from "../server.js";


// ✅ Notice Email
export const sendNoticeEmail = async (emails, title, notice) => {
  await transport.sendMail({
    from: `"HostelBase" <${process.env.EMAIL}>`,
    to: emails,
    subject: `📢 ${title}`,
    text: notice,
  });
};

// ✅ Contact Email
export const sendContactEmail = async ({ name, email, subject, message }) => {
  
  // 📩 Send to Admin
  await transport.sendMail({
    from: `"HostelBase" <${process.env.EMAIL}>`, // ✅ FIXED
    replyTo: email, // ✅ IMPORTANT
    to: process.env.EMAIL,
    subject: `📩 Contact Form: ${subject}`,
    
    html: `
      <h2>New Contact Message</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b><br/> ${message}</p>
    `,
  });

  // 📬 Auto-reply to user
  await transport.sendMail({
    from: `"HostelBase" <${process.env.EMAIL}>`,
    to: email,
    subject: "We received your message - HostelBase",

    html: `
      <p>Hi <b>${name}</b>,</p>
      <p>Thanks for contacting <b>HostelBase</b> 🙌</p>
      <p>We’ve received your message and will get back to you soon.</p>
      <br/>
      <p>Best regards,<br/>HostelBase Team</p>
    `,
  });
};