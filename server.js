import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
});

app.use("/api/", limiter);

const app = express();

// Middleware
app.use(
    cors({
      origin: "c-dijk-dev.vercel.app", // Replace with your deployed frontend URL
    })
  );
app.use(bodyParser.json());

app.post("/api/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  // Load environment variables
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const templateId = process.env.TEMPLATE_ID;

  const data = {
    personalizations: [
      {
        to: [{ email: "bjsvandijk@gmail.com" }], // Replace with the recipient email
        dynamic_template_data: {
          name,
          email,
          subject: "test", // Replace with dynamic subject if needed
          message,
        },
      },
    ],
    from: {
      email: "bjsvd@outlook.com", // Replace with your verified sender email
      name: "C~Dijk",
    },
    template_id: templateId, // Use the TEMPLATE_ID from .env
  };

  try {
    const response = await axios.post("https://api.sendgrid.com/v3/mail/send", data, {
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`, // Use the SENDGRID_API_KEY from .env
        "Content-Type": "application/json",
      },
    });

    console.log("Email sent successfully:", response.data);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
