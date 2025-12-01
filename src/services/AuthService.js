import { config } from "../config/env.js";

class AuthService {
  async validateCredentials(email, password) {
    if (!email || !password) {
      throw new Error("Email e senha são obrigatórios");
    }

    if (email !== config.adminEmail || password !== config.adminPassword) {
      throw new Error("Email ou senha inválidos");
    }

    return {
      id: 1,
      email: email,
      name: "Admin",
      role: "admin"
    };
  }

  async login(req, email, password) {
    const user = await this.validateCredentials(email, password);

    // Criar sessão
    req.session.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };

    req.session.save((err) => {
      if (err) {
        throw new Error("Erro ao salvar sessão");
      }
    });

    return user;
  }

  async logout(req) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) {
          reject(new Error("Erro ao destruir sessão"));
        } else {
          resolve();
        }
      });
    });
  }

  getCurrentUser(req) {
    return req.session?.user || null;
  }
}

export default new AuthService();