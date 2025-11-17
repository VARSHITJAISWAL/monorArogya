// server/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String },
  aadhaar: { type: String },
  fatherName: { type: String },
  motherName: { type: String },
  nominees: [
    {
      name: String,
      mobile: String,
      aadhaar: String,
    },
  ],
  profilePhoto: String,
  fatherProof: String,
  motherProof: String,
  addressProof: String,
});

module.exports = mongoose.model("User", userSchema);
