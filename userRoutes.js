// server/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const User = require("../models/User");

// ✅ Multer setup for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ✅ REGISTER USER
router.post(
  "/register",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "fatherProof", maxCount: 1 },
    { name: "motherProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        username,
        email,
        password,
        mobile,
        aadhaar,
        fatherName,
        motherName,
        nominees,
      } = req.body;

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "User already exists!" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        mobile,
        aadhaar,
        fatherName,
        motherName,
        nominees: nominees ? JSON.parse(nominees) : [],
        profilePhoto: req.files?.profilePhoto?.[0]?.path || "",
        fatherProof: req.files?.fatherProof?.[0]?.path || "",
        motherProof: req.files?.motherProof?.[0]?.path || "",
        addressProof: req.files?.addressProof?.[0]?.path || "",
      });

      await newUser.save();
      res.json({ message: "✅ User registered successfully!" });
    } catch (err) {
      console.error("Registration Error:", err);
      res.status(500).json({ message: "Server error while registering!" });
    }
  }
);

// ✅ LOGIN USER
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials!" });

    res.json({
      message: "✅ Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login!" });
  }
});

module.exports = router;
