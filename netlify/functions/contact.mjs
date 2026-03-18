import nodemailer from "nodemailer";

export const handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ message: "Method Not Allowed" }) };
  }

  let name, email, message;
  try {
    ({ name, email, message } = JSON.parse(event.body || "{}"));
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ message: "Invalid request body." }) };
  }

  if (!name || !email || !message) {
    return { statusCode: 400, headers, body: JSON.stringify({ message: "All fields are required." }) };
  }

  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.error("EMAIL_USER or EMAIL_PASS environment variables are not set.");
    return { statusCode: 503, headers, body: JSON.stringify({ message: "Email service is not configured." }) };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: emailUser, pass: emailPass },
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
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1a73e8;">${email}</a></td>
            </tr>
          </table>
          <div style="margin-top: 20px;">
            <p style="font-weight: bold; color: #555; margin-bottom: 8px;">Message:</p>
            <div style="background: #fff; border-left: 4px solid #1a3a5c; padding: 16px; border-radius: 4px; color: #333; line-height: 1.6;">
              ${message.replace(/\n/g, "<br/>")}
            </div>
          </div>
          <p style="margin-top: 24px; font-size: 12px; color: #999;">Sent via your portfolio website</p>
        </div>
      `,
      replyTo: email,
    });

    return { statusCode: 200, headers, body: JSON.stringify({ success: true, message: "Message sent successfully." }) };
  } catch (err) {
    console.error("Failed to send email:", err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ message: "Failed to send message. Please try again." }) };
  }
};
