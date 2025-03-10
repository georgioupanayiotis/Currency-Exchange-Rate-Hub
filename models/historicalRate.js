const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const HistoricalRate = sequelize.define("HistoricalRate", {
  currencyPair: { type: DataTypes.STRING, allowNull: false },
  rate: { type: DataTypes.FLOAT, allowNull: false },
  integrationId: { type: DataTypes.INTEGER, allowNull: false },
  timestamp: { type: DataTypes.DATE, allowNull: false },
})

module.exports = HistoricalRate
