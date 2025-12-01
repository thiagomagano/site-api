// src/routes/projectRoutes.js
import express from "express";
import ProjectController from "../controllers/ProjectController.js";

const router = express.Router();


// GET /api/projects
router.get("/", ProjectController.index);
// POST /api/projects
router.post("/", ProjectController.create);
// DELETE /api/projects/:id
router.delete("/:id", (req, res) => ProjectController.delete(req, res));


export default router;