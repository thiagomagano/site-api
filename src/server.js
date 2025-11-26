import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
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
