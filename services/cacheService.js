const Redis = require('ioredis')
const redis = new Redis() // Connects to Redis (localhost:6379)

const CACHE_KEY = 'latest_rates'
const CACHE_TTL = 60 * 5 // Cache expiry time: 5 minutes (300 seconds)

const setLatestRates = async (rates) => {
  try {
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(rates))
    console.log('Exchange rates saved to Redis ✅')
  } catch (error) {
    console.error('Error saving rates to Redis:', error)
  }
}

const getLatestRates = async () => {
  try {
    const data = await redis.get(CACHE_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error retrieving rates from Redis:', error)
    return null
  }
}

module.exports = { setLatestRates, getLatestRates }
