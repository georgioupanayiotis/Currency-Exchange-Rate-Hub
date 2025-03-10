const express = require("express")
const router = express.Router()
const {convertCurrency} = require("../controllers/conversionController")

router.get("/", convertCurrency)

module.exports = router
