import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/send-message", async (req, res) => {
  const { name, email, message } = req.body;

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
      email: "bjsvd@outlook.com", // Replace with your verified sender
      name: "C~Dijk",
    },
    template_id: "d-3613cf3ba8f54217ae92cbb83c15dd37", // Replace with your template ID
  };

  try {
    const response = await axios.post("https://api.sendgrid.com/v3/mail/send", data, {
      headers: {
        Authorization: "Bearer REMOVED_SECRET.PXr0iHPNTMguUlWr9O5xqjwV1cvzhci_0I7Uub6M_eo", // Replace with your API key
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
