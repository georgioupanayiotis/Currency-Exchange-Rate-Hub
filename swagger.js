const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Currency Exchange Rate Hub API 🚀",
      version: "1.0.0",
      description: "🔥 API documentation for Currency Exchange Rate Hub",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
        description: "Local Server",
      },
    ],
  },
  apis: ["./routes/integrationRoutes.js", "./routes/conversionRoutes.js", "./routes/rateRoutes.js"], // Path to the API routes file
};

// Generate Swagger docs
const swaggerSpec = swaggerJsdoc(swaggerOptions);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000
const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`🔥 Swagger API Docs available at ➡ http://localhost:${PORT}/api-docs`);
};

module.exports = setupSwagger;
