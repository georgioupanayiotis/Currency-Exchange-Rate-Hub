/* global process */
const express = require("express")
const cron = require('./services/scheduler') // eslint-disable-line

const dotenv = require("dotenv")
const { sequelize } = require("./models")
const integrationRoutes = require("./routes/integrationRoutes")
const rateRoutes = require("./routes/rateRoutes")
const conversionRoutes = require("./routes/conversionRoutes")
const statusMonitor = require("express-status-monitor");
const setupSwagger = require("./swagger")

dotenv.config()
const app = express()

// Enable the status monitor
app.use(statusMonitor());
app.use(express.json())
setupSwagger(app)

app.use("/api/integrations", integrationRoutes)
app.use("/api/rates", rateRoutes)
app.use("/api/convert", conversionRoutes)

const PORT = process.env.PORT || 3000

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced")
  app.listen(PORT, () => {
    console.log(`Server running on  ➡  http://localhost:${PORT}`)
  })
})
