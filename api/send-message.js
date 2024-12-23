import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config(); // Load environment variables from .env file

const app = express();
console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);
console.log("TEST");

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      console.log(`Origin: ${origin}`);
      const allowedOrigins = [
        "https://c-dijk-dev.vercel.app",
        "http://localhost:5173/",
        "http://localhost:5173/contact",
        "http://localhost:3001",
        "http://localhost:3001/",
        "http://localhost:5173",
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
app.use(express.json()); // For parsing JSON requests
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


  console.log("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY);

  const data = {
    personalizations: [
      {
        to: [{ email: "bjsvandijk@gmail.com" }],
        dynamic_template_data: {
          name,
          email,
          subject: "test123",
          message,
        }
      }
    ],
    from: {
      email: "bjsvandijk@gmail.com",
      name: "C-Dijk.nl",
    },
    template_id: "d-3613cf3ba8f54217ae92cbb83c15dd37",
  };
  console.log("Request Payload:", JSON.stringify(data, null, 2));
console.log("Request Headers:", {
  Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
  "Content-Type": "application/json",
});
  try {
    const response = await axios.post("https://api.sendgrid.com/v3/mail/send", data, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Email sent successfully:", response.data);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  }catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.response?.data || error.message });
    console.log("Full Request Template to SendGrid:", JSON.stringify(data, null, 2));

  }
});

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
