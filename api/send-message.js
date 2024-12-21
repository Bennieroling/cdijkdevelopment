import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`Origin: ${origin}`);
      const allowedOrigins = [
        "https://c-dijk-dev.vercel.app",
        "http://localhost:5173/",
        "http://localhost:5173/contact",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);
app.options("*", cors()); // This handles all OPTIONS requests globally
app.use(bodyParser.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests
});
app.use("/api/", limiter);

// API Route
app.post("/api/send-message", async (req, res) => {
  const { name, email, message } = req.body;

  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const templateId = process.env.TEMPLATE_ID;

  const data = {
    personalizations: [
      {
        to: [{ email: "bjsvandijk@gmail.com" }],
        dynamic_template_data: {
          name,
          email,
          subject: "test",
          message,
        },
      },
    ],
    from: {
      email: "bjsvandijk@gmail.com",
      name: "C-Dijk.nl",
    },
    template_id: templateId,
  };

  try {
    const response = await axios.post("https://api.sendgrid.com/v3/mail/send", data, {
      headers: {
        Authorization: `Bearer ${sendgridApiKey}`,
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

// Start Server
const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
