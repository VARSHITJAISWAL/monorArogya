const express = require("express");
const router = express.Router();
const ArogyaCard = require("../models/ArogyaCard");
const { verifyToken } = require("../middleware/authMiddleware");

// Create Arogya Card
router.post("/create", verifyToken, async (req, res) => {
  try {
    // Check if a card already exists for the user
    const existingCard = await ArogyaCard.findOne({ userId: req.user.id });
    if (existingCard) {
      return res.status(400).json({ message: "Arogya Card already exists for this user." });
    }

    const { fullName, address, gender, dob, bloodGroup } = req.body;
    const card = new ArogyaCard({
      userId: req.user.id, // ID comes from the JWT payload
      fullName,
      address,
      gender,
      dob,
      bloodGroup,
    });
    await card.save();
    res.json({ message: "✅ Card created successfully", card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating card" });
  }
});

// Get User's Card (Changed route name from /my-card to /)
router.get("/", verifyToken, async (req, res) => {
  try {
    // Use req.user.id from the verified JWT
    const card = await ArogyaCard.findOne({ userId: req.user.id });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card); // Send a single card object
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching card" });
  }
});

// Generate Unique ID (Updated logic to use GET/PUT more RESTfully)
router.put("/generate-id", verifyToken, async (req, res) => { // Changed POST to PUT for update
  try {
    // Generate a unique ID (e.g., AROGYA-RANDOM8CHARS)
    const uniqueId = "AROGYA-" + Math.random().toString(36).substring(2, 10).toUpperCase();

    const card = await ArogyaCard.findOneAndUpdate(
      { userId: req.user.id },
      { uniqueId },
      { new: true, runValidators: true } // Return the updated document
    );

    if (!card) return res.status(404).json({ message: "Card not found. Create one first." });
    
    res.json({ message: "✅ Unique ID generated", card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error generating unique ID" });
  }
});

module.exports = router;