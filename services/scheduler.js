const cron = require("node-cron")
const { fetchRates } = require("./openExchangeService")

// Schedule to run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.log('⏳ Fetching rates from scheduler after 5 mins...')
  await fetchRates()
  console.log("Exchange rates updated.")
})

module.exports = cron
