import express from "express";
import helmet from "helmet";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";
import { config } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);

app.get("/api", (_, res) => {
  res.json({
    message: "Hello from thiagomagano.com.br API",
    enviroment: config.env,
  });
});

app.get("/api/health", (_, res) => {
  const healthcheck = {
    status: "UP",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };
  res.status(200).send(healthcheck);
});

export default app;