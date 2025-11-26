import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/database.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from thiagomagano.com.br API",
    enviroment: process.env.NODE_ENV,
  });
});

app.get("/api/health", (req, res) => {
  res.json({ message: "API SAUDÁVEL!" });
});

app.listen(port, () => {
  console.log(`thiagomagano.com.br API is running on http://localhost:${port}`);
});
