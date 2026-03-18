import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      console.error("EMAIL_USER or EMAIL_PASS environment variables are not set.");
      return res.status(503).json({ message: "Email service is not configured." });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      await transporter.sendMail({
        from: `"Portfolio Contact" <${emailUser}>`,
        to: "jaiswalsarojj821@gmail.com",
        subject: `New message from ${name} via Portfolio`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #1a3a5c; border-bottom: 2px solid #1a3a5c; padding-bottom: 8px;">New Contact Message</h2>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 100px;">Name:</td>
                <td style="padding: 8px 0; color: #222;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0; color: #222;"><a href="mailto:${email}" style="color: #1a73e8;">${email}</a></td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
              <div style="background: #fff; border-left: 4px solid #1a3a5c; padding: 16px; border-radius: 4px; color: #333; line-height: 1.6;">
                ${message.replace(/\n/g, "<br/>")}
              </div>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #999;">Sent from your portfolio website at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" })} (UAE time)</p>
          </div>
        `,
        replyTo: email,
      });

      return res.json({ success: true, message: "Message sent successfully." });
    } catch (err: any) {
      console.error("Failed to send email:", err.message);
      return res.status(500).json({ message: "Failed to send message. Please try again." });
    }
  });

  return httpServer;
}
