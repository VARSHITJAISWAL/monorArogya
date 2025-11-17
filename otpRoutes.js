import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// ✅ Send OTP API
router.post("/send-otp", async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: "Phone or OTP missing!" });
  }

  try {
    const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
      params: {
        authorization: process.env.FAST2SMS_API_KEY,
        route: "q", // for OTP route
        message: `Your OTP for verification is ${otp}`,
        language: "english",
        flash: "0",
        numbers: phone,
      },
    });

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("OTP sending error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

export default router;
