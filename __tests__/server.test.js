/* eslint-disable */

const request = require("supertest")
const express = require("express")
const dotenv = require("dotenv")
const { sequelize } = require("../models")
const integrationRoutes = require("../routes/integrationRoutes")
const rateRoutes = require("../routes/rateRoutes")
const conversionRoutes = require("../routes/conversionRoutes")

dotenv.config()

// Create a test instance of the Express app
const app = express()
app.use(express.json())
app.use("/api/integrations", integrationRoutes)
app.use("/api/rates", rateRoutes)
app.use("/api/convert", conversionRoutes)

beforeAll(async () => {
  await sequelize.sync({ force: true }) // Use `force: true` for a clean test database
})

afterAll(async () => {
  await sequelize.close() // Ensure the database connection is closed after tests
})

describe("Server API Routes", () => {
  test("GET /api/integrations should return 200", async () => {
    const res = await request(app).get("/api/integrations")
    expect(res.statusCode).toBe(200)
  })

  test("GET /api/rates should return 200", async () => {
    const res = await request(app).get("/api/rates")
    expect(res.statusCode).toBe(200)
  })

  test("POST /api/convert should return 404 if no data is provided", async () => {
    const res = await request(app).post("/api/convert").send({})
    expect(res.statusCode).toBe(404)
  })
})
