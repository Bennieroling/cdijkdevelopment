import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const msg = {
      to,
      from: process.env.NEXT_PUBLIC_SENDER_EMAIL as string,
      subject,
      text,
      html:`<p>${text}</p>`
    };

    const response = await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully", response });
  } catch (error:unknown) {
    res.status(500).json({ error: "Failed to send email" });
  }
}