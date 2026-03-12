import nodemailer from "nodemailer";
import path from "path";

export async function sendEmail({ to, subject, html, attachments = [] }: { 
  to: string; 
  subject: string; 
  html: string;
  attachments?: any[];
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const logoPath = path.join(process.cwd(), "public", "images", "logo.png");

    const mailOptions = {
      from: `"IREACT Initiative" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments: [
        {
          filename: 'logo.png',
          path: logoPath,
          cid: 'logo' // same cid value as in the html <img src="cid:logo" />
        },
        ...attachments
      ]
    };

    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
