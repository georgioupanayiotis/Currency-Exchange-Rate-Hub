
const cron = require("node-cron")
const { fetchRates } = require("./openExchangeService")

// Read interval from environment variable or default to "*/5 * * * *" (every 5 minutes)
// eslint-disable-next-line no-undef
const cronInterval = process.env.FETCH_RATE_INTERVAL || 5

cron.schedule(`*/${cronInterval} * * * *`, async () => {
  console.log(`⏳ Fetching rates from scheduler after ${cronInterval} mins...`)
  await fetchRates()
  console.log("Exchange rates updated.")
})

module.exports = cron
