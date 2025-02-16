import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, subject, text, name, phone } = req.body;

  if (!email || !phone || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const msg = {
      to: "bjsvandijk@gmail.com",
      from: "bjsvandijk@gmail.com",
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
        <h1>Niew bericht via C-Dijk.nl</h1>
      </div>
      <div class="content">
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Telefoon:</strong>${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Onderwerp:</strong> ${subject}</p>
        <p><strong>Bericht:</strong></p>
        <p>${text}</p>
      </div>
      <div class="footer">
        <p>Dit bericht is verzonden via het contactformulier op uw website.</p>
      </div>
    </div>
  </body>
</html>
    `
    };

    const response = await sgMail.send(msg);
    res.status(200).json({ message: "Je bericht is verstuurd!", response });
  } catch (error:unknown) {
    res.status(500).json({ error: `Failed to send email, ${error}` });
  }
}
