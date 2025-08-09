// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  username: { type: String },
  first_name: { type: String },
  last_name: { type: String },
  profile_photo: { type: String },
  currencies: {
    haloOrbs: { type: Number, default: 0 },
    lumenOrbs: { type: Number, default: 0 },
    starNightCrystals: { type: Number, default: 0 },
    orbitalJewels: { type: Number, default: 0 },
    auricCrescents: { type: Number, default: 0 },
  },
  inventory: [
    {
      name: String,
      rarity: Number,
      type: String, // e.g., "character" or "weapon"
    },
  ],
  pity: {
    standard5: { type: Number, default: 0 },
    standard4: { type: Number, default: 0 },
    limited5: { type: Number, default: 0 },
    limited4: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);