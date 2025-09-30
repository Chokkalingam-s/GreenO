import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  const { name, mobile, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",  // ✅ Use Zoho India server
      port: 465,             // SSL
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"CG Foundation Contact" <${process.env.MAIL_USER}>`,
      to: "info@cgfoundation.in",   // Main recipient
      bcc: "chokka7878@gmail.com",  // Hidden copy
      subject: "New Contact Message",
      html: `
        <h3>New Contact Request</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Mobile:</b> ${mobile}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
