const express = require("express");
const router = express.Router();
const {
  getHistoricalRates,
  getAllRates,
} = require("../controllers/rateController");
const { getCachedRates } = require("../services/openExchangeService");

/**
 * @swagger
 * tags:
 *   name: Exchange Rates
 *   description: API for retrieving exchange rate data
 */

/**
 * @swagger
 * /rates:
 *   get:
 *     summary: Get all available exchange rates
 *     tags: [Exchange Rates]
 *     responses:
 *       200:
 *         description: Successfully retrieved all exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base:
 *                   type: string
 *                   example: "USD"
 *                 rates:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   example: { "EUR": 0.92, "GBP": 0.79, "JPY": 110.2 }
 *       500:
 *         description: Internal server error
 */
router.get("/", getAllRates);

/**
 * @swagger
 * /rates/history:
 *   get:
 *     summary: Get historical exchange rates
 *     tags: [Exchange Rates]
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date for historical exchange rates (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Successfully retrieved historical exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base:
 *                   type: string
 *                   example: "USD"
 *                 date:
 *                   type: string
 *                   example: "2024-03-10"
 *                 rates:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   example: { "EUR": 0.91, "GBP": 0.78, "JPY": 109.5 }
 *       400:
 *         description: Invalid date format
 *       500:
 *         description: Internal server error
 */
router.get("/history", getHistoricalRates);

/**
 * @swagger
 * /rates/latest:
 *   get:
 *     summary: Get the latest exchange rates (cached)
 *     tags: [Exchange Rates]
 *     responses:
 *       200:
 *         description: Successfully retrieved the latest cached exchange rates
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 base:
 *                   type: string
 *                   example: "USD"
 *                 rates:
 *                   type: object
 *                   additionalProperties:
 *                     type: number
 *                   example: { "EUR": 0.92, "GBP": 0.79, "JPY": 110.2 }
 *       500:
 *         description: Internal server error
 */
router.get("/latest", getCachedRates);

module.exports = router;
