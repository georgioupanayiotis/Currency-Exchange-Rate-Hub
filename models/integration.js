// models/integration.js
const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const Integration = sequelize.define("Integration", {
  name: { type: DataTypes.STRING, allowNull: false },
  apiKey: { type: DataTypes.STRING, allowNull: false },
  baseUrl: { type: DataTypes.STRING, allowNull: false },
  rateLimit: { type: DataTypes.INTEGER, allowNull: false },
})

module.exports = Integration
