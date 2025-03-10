const express = require("express");
const router = express.Router();
const integrationController = require("../controllers/integrationController");

/**
 * @swagger
 * tags:
 *   name: Integrations
 *   description: API for managing integrations
 */

/**
 * @swagger
 * /integrations:
 *   post:
 *     summary: Create a new integration
 *     tags: [Integrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Stripe"
 *               apiKey:
 *                 type: string
 *                 example: "sk_test_51H5l3L"
 *               baseUrl:
 *                 type: string
 *                 example: "https://api.stripe.com"
 *               rateLimit:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Integration created successfully
 *       400:
 *         description: Invalid request data
 */
router.post("/", integrationController.createIntegration);

/**
 * @swagger
 * /integrations:
 *   get:
 *     summary: Get all integrations
 *     tags: [Integrations]
 *     responses:
 *       200:
 *         description: A list of integrations (API keys are not returned for security)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Stripe"
 *                   baseUrl:
 *                     type: string
 *                     example: "https://api.stripe.com"
 *                   rateLimit:
 *                     type: integer
 *                     example: 100
 */
router.get("/", integrationController.getAllIntegrations);

/**
 * @swagger
 * /integrations/{id}:
 *   put:
 *     summary: Update an integration
 *     tags: [Integrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the integration to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Stripe Updated"
 *               apiKey:
 *                 type: string
 *                 example: "sk_updated_test_51H5l3L"
 *               baseUrl:
 *                 type: string
 *                 example: "https://api.stripe.com"
 *               rateLimit:
 *                 type: integer
 *                 example: 150
 *     responses:
 *       200:
 *         description: Integration updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Integration not found
 */
router.put("/:id", integrationController.updateIntegration);

/**
 * @swagger
 * /integrations/{id}:
 *   delete:
 *     summary: Delete an integration
 *     tags: [Integrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the integration to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Integration deleted successfully
 *       404:
 *         description: Integration not found
 */
router.delete("/:id", integrationController.deleteIntegration);

module.exports = router;
