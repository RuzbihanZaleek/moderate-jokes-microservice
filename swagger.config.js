const swaggerJsDoc = require("swagger-jsdoc");
const { SWAGGER_CONFIG } = require("./src/constants");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: SWAGGER_CONFIG.TITLE,
      version: SWAGGER_CONFIG.VERSION,
      description: SWAGGER_CONFIG.DESCRIPTION,
    },
    servers: [
      {
        url: SWAGGER_CONFIG.SERVER_URL,
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJsDoc(swaggerOptions);
