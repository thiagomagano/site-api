import express from "express";
import helmet from "helmet";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/projects", projectRoutes);

app.get("/api", (_, res) => {
  res.json({
    message: "Hello from thiagomagano.com.br API",
    enviroment: process.env.NODE_ENV,
  });
});

app.get("/api/health", (_, res) => {
  res.json({ message: "API SAUDÁVEL!" });
});

export default app;