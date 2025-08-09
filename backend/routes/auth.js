const express = require("express");
const User = require("../models/User");
const { verifyTelegramInitData } = require("../utils/verifyTelegram");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { initData } = req.body;

    // Verify Telegram initData hash (enable in production)
    if (!verifyTelegramInitData(initData, process.env.TELEGRAM_BOT_TOKEN)) {
      return res.status(401).json({ error: "Unauthorized: Invalid Telegram data" });
    }

    // Extract the 'user' parameter from initData (URL query string format)
    const userParam = initData
      .split("&")
      .find((param) => param.startsWith("user="));
    if (!userParam) {
      return res.status(400).json({ error: "User data missing in initData" });
    }

    // Decode base64 user JSON
    const userJsonBase64 = userParam.split("=")[1];
    const userInfo = JSON.parse(Buffer.from(userJsonBase64, "base64").toString());

    // Upsert user in DB
    let user = await User.findOne({ telegramId: userInfo.id });
    if (!user) {
      user = new User({
        telegramId: userInfo.id,
        username: userInfo.username,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        profile_photo: userInfo.photo_url,
      });
      await user.save();
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;