import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";
import { getEmailTemplate } from "@/utils/parse-form-submission";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, subject, text,name } = req.body;

  if (!email || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const msg = {
      to: process.env.NEXT_PUBLIC_SENDER_EMAIL as string,
      from: process.env.NEXT_PUBLIC_SENDER_EMAIL as string,
      subject,
      text,
      html:`
    <html>
  <head>
    <title>Contact Form Submission</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background-color: #ffffff;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #333;
      }
      .content {
        line-height: 1.6;
      }
      .content p {
        margin: 10px 0;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>New Contact Form Submission</h1>
      </div>
      <div class="content">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${text}</p>
      </div>
      <div class="footer">
        <p>This message was submitted via the contact form on your website.</p>
      </div>
    </div>
  </body>
</html>
    `
    };

    const response = await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully", response });
  } catch (error:unknown) {
    res.status(500).json({ error: `Failed to send email, ${error}` });
  }
}