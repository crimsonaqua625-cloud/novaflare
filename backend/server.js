require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import your routes
const authRoutes = require('./routes/auth');
const gachaRoutes = require('./routes/gacha');
const inventoryRoutes = require('./routes/inventory');
const currencyRoutes = require('./routes/currency');

// Import and start Telegram bot
const bot = require('./bot');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/gacha', gachaRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/currency', currencyRoutes);

// Telegram Webhook setup
const RENDER_URL = process.env.RENDER_URL;
if (RENDER_URL) {
  bot.setWebHook(`${RENDER_URL}/bot`);
}

// Telegram Webhook route
app.post('/bot', (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
