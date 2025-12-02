import express from "express";
import helmet from "helmet";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import { config } from "./config/env.js";
import pino from "pino-http";


const app = express();
app.use(pino());
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Configuração de sessão
app.use(session({
  name: "sessionId",
  secret: process.env.SESSION_SECRET || "your-secret-key-change-in-production",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: config.mongoUri,
    ttl: 14 * 24 * 60 * 60, // 14 dias
  }),
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true, // Proteção XSS
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 dias
    sameSite: "lax"
  }
}));

app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);

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