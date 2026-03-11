"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: "Please provide a valid email address." };
  }

  try {
    // Check if already subscribed
    const existing = await (prisma as any).newsletter.findUnique({
      where: { email }
    });

    if (existing) {
      return { error: "You are already subscribed to our perspectives." };
    }

    // Save to database
    await (prisma as any).newsletter.create({
      data: { email }
    });

    // Send Welcome Email
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const mailOptions = {
        from: `"IREACT Initiative" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Welcome to the IREACT Community! 🌍",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #059669;">Welcome to IREACT!</h2>
            <p>Thank you for subscribing to our newsletter. You're now part of a global youth-led community dedicated to climate resilience and sustainable development.</p>
            <p>We'll keep you updated with:</p>
            <ul>
              <li>Localized climate insights</li>
              <li>Research field notes</li>
              <li>Impact stories from our communities</li>
            </ul>
            <p>Stay connected!</p>
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #777;">
              © ${new Date().getFullYear()} IREACT Initiative. Translating global goals into community action.
            </div>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email delivery failed:", emailError);
      // We don't return error here because the DB subscription succeeded
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Newsletter error:", error);
    return { error: "Failed to subscribe. Please try again later." };
  }
}

export async function deleteSubscriber(id: string) {
  try {
    await (prisma as any).newsletter.delete({
      where: { id }
    });
    revalidatePath("/admin/subscribers");
    return { success: true };
  } catch (error) {
    console.error("Delete subscriber error:", error);
    return { error: "Failed to delete subscriber." };
  }
}

import { campaignTemplates } from "@/lib/constants/templates";

export async function sendCampaign(formData: FormData) {
  const templateId = formData.get("templateId") as string;
  const subject = formData.get("subject") as string;
  const content = formData.get("content") as string;

  if (!subject || !content) {
    return { error: "Subject and content are required." };
  }

  try {
    const subscribers = await (prisma as any).newsletter.findMany();
    if (subscribers.length === 0) {
      return { error: "No subscribers found to send to." };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // We'll send them in a loop, for a real app we'd use a queue
    let sentCount = 0;
    for (const sub of subscribers) {
      try {
        await transporter.sendMail({
          from: `"IREACT Initiative" <${process.env.SMTP_USER}>`,
          to: sub.email,
          subject: subject,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #eee; border-radius: 20px; color: #1e293b;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #059669; margin: 0;">IREACT Initiative</h1>
                <p style="text-transform: uppercase; font-size: 10px; letter-spacing: 2px; font-weight: bold; color: #64748b;">Rural Empowerment and Climate Technology</p>
              </div>
              <div style="line-height: 1.6; font-size: 16px;">
                ${content.replace(/\n/g, '<br/>')}
              </div>
              <div style="margin-top: 40px; text-align: center;">
                <a href="https://ireactinitiative.org/blog" style="background-color: #059669; color: white; padding: 12px 25px; border-radius: 10px; text-decoration: none; font-weight: bold; display: inline-block;">Read More on our Blog</a>
              </div>
              <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #94a3b8; text-align: center;">
                You are receiving this because you subscribed to the IREACT Initiative updates.<br/>
                45 Yakubu Gowon Way, Jos, Nigeria
              </div>
            </div>
          `,
        });
        sentCount++;
      } catch (e) {
        console.error(`Failed to send campaign to ${sub.email}:`, e);
      }
    }

    // Log the campaign
    await (prisma as any).campaign.create({
      data: {
        subject,
        content,
        template: templateId,
        sentCount
      }
    });

    revalidatePath("/admin/subscribers");
    return { success: true, sentCount };
  } catch (error) {
    console.error("Campaign error:", error);
    return { error: "Failed to process campaign. Please check SMTP settings." };
  }
}
