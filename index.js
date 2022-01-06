const TelegramBot = require('node-telegram-bot-api')
const flags = require('country-code-emoji')
const tellmeHoliday = require('./Holiday')
require('dotenv').config()
const { TELEGRAM_TOKEN } = process.env
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true })

const button = {
  reply_markup: {
    keyboard: [['/start']],
    resize_keyboard: true,
    one_time_keyboard: true,
    force_reply: true,
  },
}

bot.on('message', (msg) => {
  const firstName = msg.from.first_name
  const {
    chat: { id },
  } = msg
  if (msg.text === '/start') {
    bot.sendMessage(id, `Please enter your country...`, {
      reply_markup: {
        keyboard: [
          [
            flags.countryCodeEmoji('GE'),
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
  } else if (
    msg.text === flags.countryCodeEmoji('GE') ||
    msg.text === flags.countryCodeEmoji('TR') ||
    msg.text === flags.countryCodeEmoji('UA') ||
    msg.text === flags.countryCodeEmoji('US') ||
    msg.text === flags.countryCodeEmoji('CA') ||
    msg.text === flags.countryCodeEmoji('GB') ||
    msg.text === flags.countryCodeEmoji('AU')
  ) {
    const country = flags.emojiCountryCode(msg.text)
    tellmeHoliday(country).then((holidays) => bot.sendMessage(id, holidays))
  } else {
    bot.sendMessage(id, 'unknown command', button)
  }
})

