const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;

// Pass `null` to disable polling.
const bot = new TelegramBot(token, { polling: false });

const miniAppUrl = 'https://novaflare-n1m23osra-crimsonaqua625-clouds-projects.vercel.app/';

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // The reply_markup object is defined directly here.
  const keyboard = {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Open NovaFlare Mini App",
            web_app: { url: miniAppUrl }
          }
        ]
      ],
      resize_keyboard: true, // This is crucial to make the button large
      one_time_keyboard: false // Keeps the keyboard visible
    }
  };

  bot.sendMessage(chatId, "Welcome to NovaFlare! Tap below to open the Mini App.", keyboard);
});

module.exports = bot;
