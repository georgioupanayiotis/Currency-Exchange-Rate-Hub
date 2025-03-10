const sequelize = require("../config/db")
const Integration = require("./integration")
const LatestRate = require("./latestRate")
const HistoricalRate = require("./historicalRate")

Integration.hasMany(LatestRate, { foreignKey: "integrationId" })
LatestRate.belongsTo(Integration, { foreignKey: "integrationId" })

Integration.hasMany(HistoricalRate, { foreignKey: "integrationId" })
HistoricalRate.belongsTo(Integration, { foreignKey: "integrationId" })

module.exports = { sequelize, Integration, LatestRate, HistoricalRate }
