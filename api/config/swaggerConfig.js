const path = require("path");
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
            },
        ],
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                },
                refreshToken: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    description: "Utilisé pour obtenir un nouveau jeton d'accès",
                },
            },
        },
        security: [
            {
                jwt: [],
            },
            {
                refreshToken: [],
            },
        ],
    },
    apis: [path.join(__dirname, "../routes/*.js")],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;