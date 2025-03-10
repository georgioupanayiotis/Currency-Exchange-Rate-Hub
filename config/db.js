/* global process */
const { Sequelize } = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false,
})

sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.error("Database connection error:", err))

module.exports = sequelize
