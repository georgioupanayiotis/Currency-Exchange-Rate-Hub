const express = require("express")
const router = express.Router()
// const rateController = require('../controllers/rateController');
const {
  getHistoricalRates,
  getAllRates,
} = require("../controllers/rateController")
const { getCachedRates } = require("../services/openExchangeService")

router.get("/", getAllRates)
router.get("/history", getHistoricalRates)
router.get("/latest", getCachedRates)

module.exports = router
