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