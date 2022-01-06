const axios = require('axios')
require('dotenv').config()
const { ABSTRACT_API_KEY } = process.env
const flags = require('country-code-emoji')

const TellMeHoliday = async (country) => {
  try {
    const now = new Date()
    const { data } = await axios.get(`https://holidays.abstractapi.com/v1/`, {
      params: {
        api_key: ABSTRACT_API_KEY,
        country,
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
      },
    })
    return (
      data.map(({ name }) => name).join('\n') ||
      `No holidays for today in ${flags.countryCodeEmoji(country)}`
    )
  } catch (err) {
    return bot.sendMessage(`${firstName},command failed: ${err.message})`)
  }
}
module.exports = TellMeHoliday
