import express from "express";
import AuthController from "../controllers/AuthController.js";
import { requireAuth } from "../middleware/authMiddleware.js";


const router = express.Router();


// POST /api/auth/login
router.post("/login", AuthController.login);

// POST /api/auth/logout
router.post("/logout", requireAuth, AuthController.logout);

// GET /api/auth/me - Verifica sessão atual
router.get("/me", AuthController.me);


export default router;