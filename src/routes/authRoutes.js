import express from "express";
import { config } from "../config/env.js";


const router = express.Router();


// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email e senha são obrigatórios'
      });
    }

    // Verifica credenciais
    if (email !== config.adminEmail || password !== config.adminPassword) {
      return res.status(401).json({
        message: 'Email ou senha inválidos'
      });
    }

    // Retorna dados do usuário (sem senha!)
    return res.status(200).json({
      id: 1,
      email: email,
      name: 'Admin',
      role: 'admin'
    });

  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
});


export default router;