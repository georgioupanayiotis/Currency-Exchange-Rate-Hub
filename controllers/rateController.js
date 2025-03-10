const { LatestRate, HistoricalRate } = require("../models")
const { fetchRates } = require("../services/openExchangeService")
const { Op } = require("sequelize")

const getAllRates = async (req, res) => {
  try {
    const rates = await LatestRate.findAll()
    res.status(200).json(rates)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getHistoricalRates = async (req, res) => {
  try {
    const { pair, start, end } = req.query
    const rates = await HistoricalRate.findAll({
      where: {
        currencyPair: pair,
        timestamp: {
          [Op.between]: [new Date(start), new Date(end)],
        },
      },
    })
    res.status(200).json(rates)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getLatestRates = async (req, res) => {
  try {
    await fetchRates()
    res
      .status(200)
      .json({ message: "Latest rates fetched and updated successfully." })
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch latest rates. - ${error}` })
  }
}

module.exports = { getHistoricalRates, getLatestRates, getAllRates }
