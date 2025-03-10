const { DataTypes } = require("sequelize")
const sequelize = require("../config/db")

const LatestRate = sequelize.define("LatestRate", {
  currencyPair: { type: DataTypes.STRING, allowNull: false },
  rate: { type: DataTypes.FLOAT, allowNull: false },
  integrationId: { type: DataTypes.INTEGER, allowNull: false },
})

module.exports = LatestRate
