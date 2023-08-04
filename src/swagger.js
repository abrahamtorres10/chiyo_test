export const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Chiyo Express API - Session Management",
      version: "0.1.0",
      description: "REST API definition",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Abraham Torres",
        url: "https://abrahamtorres-resume.netlify.app/",
        email: "luisabrahamtl_2@outlook.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/v1",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};
