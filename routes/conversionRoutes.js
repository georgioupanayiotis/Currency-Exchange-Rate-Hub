const express = require("express");
const router = express.Router();
const { convertCurrency } = require("../controllers/conversionController");

/**
 * @swagger
 * tags:
 *   name: Conversion
 *   description: Currency conversion API
 */

/**
 * @swagger
 * /conversion:
 *   get:
 *     summary: Convert currency from one to another
 *     tags: [Conversion]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         description: The currency code to convert from (e.g., "USD")
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         description: The currency code to convert to (e.g., "EUR")
 *       - in: query
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *         description: The amount to convert
 *     responses:
 *       200:
 *         description: Successful conversion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 from:
 *                   type: string
 *                   example: "USD"
 *                 to:
 *                   type: string
 *                   example: "EUR"
 *                 amount:
 *                   type: number
 *                   example: 100
 *                 convertedAmount:
 *                   type: number
 *                   example: 92.50
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", convertCurrency);

module.exports = router;
