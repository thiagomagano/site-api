// src/routes/projectRoutes.js
import express from "express";
import ProjectController from "../controllers/ProjectController.js";

const router = express.Router();


// GET /api/projects
router.get("/", ProjectController.index);

router.get("/:id", ProjectController.show);
// POST /api/projects
router.post("/", ProjectController.create);
// DELETE /api/projects/:id
router.delete("/:id", ProjectController.delete);


export default router;