const sequelize = require("./db")
// const { DataTypes } = require('sequelize');

const { Integration, LatestRate, HistoricalRate } = require("../models")

sequelize
  .sync({ force: false })
  .then(() => console.log("Database & tables synced!"))
  .catch((err) => console.error("Error syncing database:", err))

module.exports = { Integration, LatestRate, HistoricalRate }
