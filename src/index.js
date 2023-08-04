import { config } from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import pingRoutes from "./routes/ping.routes.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger.js";

config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const restVersion = "/v1";

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.json({ type: "application/json" }));
app.use(restVersion + "/ping", pingRoutes);

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, () => {
  console.log(
    `--> CHIYO TEST - ABRAHAM - Express.js Server running on port: ${PORT}`
  );
});
