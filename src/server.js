import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import connectDB from "./config/database.js";
import Project from "./models/Project.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    console.error("ERRO REAL:", err);
    res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar projetos" });
  }
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from thiagomagano.com.br API",
    enviroment: process.env.NODE_ENV,
  });
});

app.get("/api/health", (req, res) => {
  res.json({ message: "API SAUDÁVEL!" });
});

app.listen(PORT, () => {
  console.log(`thiagomagano.com.br API is running on http://localhost:${PORT}`);
});
