import AuthService from "../services/AuthService.js";

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.login(req, email, password);

      return res.status(200).json({
        message: "Login realizado com sucesso",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error("Erro no login:", error);

      if (error.message === "Email e senha são obrigatórios") {
        return res.status(400).json({
          message: error.message
        });
      }

      if (error.message === "Email ou senha inválidos") {
        return res.status(401).json({
          message: error.message
        });
      }

      return res.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

  async logout(req, res) {
    try {
      await AuthService.logout(req);

      return res.status(200).json({
        message: "Logout realizado com sucesso"
      });
    } catch (error) {
      console.error("Erro no logout:", error);
      return res.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }

  async me(req, res) {
    try {
      const user = AuthService.getCurrentUser(req);

      if (!user) {
        return res.status(401).json({
          message: "Não autenticado"
        });
      }

      return res.status(200).json({
        user: user
      });
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      return res.status(500).json({
        message: "Erro interno do servidor"
      });
    }
  }
}

export default new AuthController();