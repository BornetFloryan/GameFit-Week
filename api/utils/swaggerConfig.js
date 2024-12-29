const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "GameFit App",
            description: "API documentation",
            version: "1.0.0",
        },
        servers: [
            {
                url: "http://localhost:3000/",
                description: "Local server",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
