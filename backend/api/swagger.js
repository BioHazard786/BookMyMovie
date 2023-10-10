const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Config Swagger UI
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BookMyMovie API Docs",
      version: "1.0.0",
      description: "Documentation created for BookMyMovie API.",
    },
  },
  apis: ["./api.js"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  // Swagger page
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
}

module.exports = swaggerDocs;
