const logger = require("../logger")
const { LatestRate } = require("../models")
const { getLatestRates } = require("../services/cacheService")

exports.convertCurrency = async (req, res) => {
  try {
    const { from, to, amount } = req.query // Get parameters from URL

    if (!from || !to || !amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Invalid request data' })
    }

    // Try fetching rates from Redis cache first
    let rates = await getLatestRates()

    if (!rates) {
      logger.info('Rates not found in Redis, fetching from DB...')
      const dbRates = await LatestRate.findAll()
      if (dbRates.length === 0) {
        return res.status(500).json({ error: 'Exchange rates not available' })
      }

      // Convert DB results to key-value format
      rates = dbRates.reduce((acc, rate) => {
        acc[rate.currencyPair.replace('USD-', '')] = rate.rate
        return acc
      }, {})
    }

    // Convert the amount
    if (!rates[to] || !rates[from]) {
      return res.status(400).json({ error: 'Invalid currency pair' })
    }

    // Convert via USD as a base currency
    const usdAmount = amount / rates[from] // Convert to USD first
    const convertedAmount = usdAmount * rates[to] // Convert to target currency

    res.status(200).json({
      from,
      to,
      amount: parseFloat(amount),
      convertedAmount: parseFloat(convertedAmount.toFixed(2)), // Round to 2 decimals
      rate: rates[to]
    })
  } catch (error) {
    console.error('Currency conversion error:', error)
    res.status(500).json({ error: 'Conversion failed' })
  }

}
