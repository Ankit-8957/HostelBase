import nodemailer  from "nodemailer";

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "yash0011pandey@gmail.com",
        pass: "gxlirswpmxjknesw"
    }
});

export const sendNoticeEmail = async (emails,title, notice) => {
    await transport.sendMail({
        from: "HostelBase yash0011pandey@gmail.com",
        to: emails,
        subject: `📢 ${title}`,
        text: notice
    });
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  await transport.sendMail({
    from: `"${name}" <${email}>`, // sender = user
    to: process.env.EMAIL, // your admin email
    subject: `📩 Contact Form: ${subject}`,
    text: `
New Contact Message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `,
  });

  // ✅ Auto-reply to user (optional but 🔥)
  await transport.sendMail({
    to: email,
    subject: "We received your message - HostelBase",
    text: `Hi ${name},

Thanks for contacting HostelBase 🙌
We have received your message and will get back to you soon.

Best regards,
HostelBase Team`,
  });
};