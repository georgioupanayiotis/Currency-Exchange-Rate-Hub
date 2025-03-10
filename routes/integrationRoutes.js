const express = require("express")
const router = express.Router()
const integrationController = require("../controllers/integrationController")

router.post("/", integrationController.createIntegration)
router.get("/", integrationController.getAllIntegrations)
router.put("/:id", integrationController.updateIntegration)
router.delete("/:id", integrationController.deleteIntegration)

module.exports = router
