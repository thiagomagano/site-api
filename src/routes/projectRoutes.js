import express from "express";
import ProjectController from "../controllers/ProjectController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();


// GET /api/projects
router.get("/", ProjectController.index);
// GET /api/projects/:id
router.get("/:id", ProjectController.show);
// POST /api/projects
router.post("/", requireAuth, ProjectController.create);
// PUT /api/projects/:id
router.put("/:id", requireAuth, ProjectController.update);
// DELETE /api/projects/:id
router.delete("/:id", requireAuth, ProjectController.delete);


export default router;