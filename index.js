const TelegramBot = require('node-telegram-bot-api')
const flags = require('country-code-emoji')
const tellmeHoliday = require('./Holiday')
require('dotenv').config()
const { TELEGRAM_TOKEN } = process.env
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

bot.on('message', (msg) => {
  const {
    chat: { id },
  } = msg
  if (msg.text === '/start') {
    bot.sendMessage(id, 'Please enter your country...', {
      reply_markup: {
        keyboard: [
          [
            flags.countryCodeEmoji('GE'),
            flags.countryCodeEmoji('RU'),
            flags.countryCodeEmoji('TR'),
            flags.countryCodeEmoji('UA'),
            flags.countryCodeEmoji('US'),
            flags.countryCodeEmoji('CA'),
            flags.countryCodeEmoji('GB'),
            flags.countryCodeEmoji('AU'),
          ],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
        force_reply: true,
      },
    })
  } else {
    const country = flags.emojiCountryCode(msg.text)
    tellmeHoliday(country).then((holidays) => bot.sendMessage(id, holidays))
  }
})
