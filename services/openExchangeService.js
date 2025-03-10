/* global process */
const axios = require('axios')
const { LatestRate } = require('../models')
const { setLatestRates, getLatestRates } = require('./cacheService')
const logger = require('../logger')

const {
  OPENEXCHANGE_API_KEY,
  OPENEXCHANGE_BASE_URL,
  EXCHANGERATES_BASE_URL,
  EXCHANGERATES_API_KEY,
} = process.env

const fetchRatesFromAPI = async (apiUrl, integrationId) => {
  try {
    const response = await axios.get(apiUrl)
    const rates = response.data.rates

    // Save rates to database
    for (const [currency, rate] of Object.entries(rates)) {
      await LatestRate.upsert({
        currencyPair: `USD-${currency}`,
        rate,
        integrationId,
      })
    }

    logger.info(`Rates updated using Integration ID: ${integrationId}`)

    // Save latest rates to Redis only after the first successful API call
    await setLatestRates(rates)

    return rates
  } catch (error) {
    console.error(
      `Failed to fetch rates from Integration ID: ${integrationId}`,
      error.message
    )
    return null
  }
}

const fetchRates = async () => {
  try {
    let apiUrl = `${OPENEXCHANGE_BASE_URL}/latest.json?app_id=${OPENEXCHANGE_API_KEY}`
    let rates = await fetchRatesFromAPI(apiUrl, 1)

    // If primary API fails, fetch from the backup
    if (!rates) {
      apiUrl = `${EXCHANGERATES_BASE_URL}latest?access_key=${EXCHANGERATES_API_KEY}`
      rates = await fetchRatesFromAPI(apiUrl, 2)
    }

    logger.info('Latest rates updated ✅')
  } catch (error) {
    console.error('Failed to fetch rates:', error.message)
  }
}

// **NEW: Fetch latest rates from cache, or fetch from DB and cache**
const getCachedRates = async (req, res) => {
  try {
    let rates = await getLatestRates() // 1️⃣ Try fetching from Redis

    if (rates) {
      logger.info('✅ Serving rates from Redis cache ⚡');
      return res.status(200).json(rates)
    }

    logger.info('⚠️ No rates found in Redis. Checking DB...')

    // 2️⃣ Fetch rates from the database
    const dbRates = await LatestRate.findAll()

    if (dbRates.length > 0) {
      logger.info('✅ Rates found in DB. Caching in Redis...')
      rates = dbRates.reduce((acc, rate) => {
        acc[rate.currencyPair.replace('USD-', '')] = rate.rate
        return acc
      }, {})

      await setLatestRates(rates) // Cache DB rates in Redis
      return res.status(200).json(rates)
    }

    logger.info('❌ No rates found in DB. Fetching from API...')

    // 3️⃣ No rates in DB → Fetch from API
    await fetchRates()
    rates = await getLatestRates() // Retrieve new rates from Redis

    if (rates) {
      logger.info('✅ Rates fetched from API and saved in DB & Redis')
      return res.status(200).json(rates)
    }

    return res.status(500).json({ error: 'Failed to retrieve exchange rates' })
  } catch (error) {
    console.error('🚨 Error retrieving exchange rates:', error)
    return res.status(500).json({ error: 'Failed to retrieve exchange rates' })
  }
}


module.exports = { fetchRates, getCachedRates }
