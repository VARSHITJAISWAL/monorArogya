// server/models/ArogyaCard.js
const mongoose = require("mongoose");

const arogyaCardSchema = new mongoose.Schema({
  // Link to the User model
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true, 
    unique: true 
  },
  uniqueID: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  father: { type: String, required: true },
  mother: { type: String, required: true },
  dob: { type: Date, required: true },
  blood: { type: String, required: true },
  address: { type: String, required: true },
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model("ArogyaCard", arogyaCardSchema);