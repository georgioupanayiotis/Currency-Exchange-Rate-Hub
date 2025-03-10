const { Integration } = require("../models")

exports.createIntegration = async (req, res) => {
  try {
    const integration = await Integration.create(req.body)

    res.status(201).json(integration)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getAllIntegrations = async (req, res) => {
  try {
    const integrations = await Integration.findAll()
    res.status(200).json(integrations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.updateIntegration = async (req, res) => {
  try {
    const { id } = req.params
    const [updated] = await Integration.update(req.body, { where: { id } })
    if (updated) {
      const updatedIntegration = await Integration.findByPk(id)
      res.status(200).json(updatedIntegration)
    } else {
      res.status(404).json({ error: "Integration not found" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.deleteIntegration = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Integration.destroy({ where: { id } })
    if (deleted) {
      res.status(204).send()
    } else {
      res.status(404).json({ error: "Integration not found" })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
