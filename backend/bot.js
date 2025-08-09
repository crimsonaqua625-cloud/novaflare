// backend/bot.js
const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN; // put your bot token in .env

const bot = new TelegramBot(token, { polling: true });

const miniAppUrl = 'https://novaflare-n1m23osra-crimsonaqua625-clouds-projects.vercel.app/';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const keyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Open NovaFlare Mini App",
            web_app: { url: miniAppUrl }
          }
        ]
      ]
    }
  };

  bot.sendMessage(chatId, "Welcome to NovaFlare! Tap below to open the Mini App.", keyboard);
});

module.exports = bot;