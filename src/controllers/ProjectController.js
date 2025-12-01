import Project from "../models/Project.js";

class ProjectController {
  async index(req, res) {
    try {
      const projects = await Project.find();
      return res.status(200).json(projects);
    } catch (err) {
      console.error("Erro ao buscar projetos: ", err);
      return res.status(500).json({ error: "Erro ao buscar projetos" })
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }

      return res.status(200).json(project);

    } catch (err) {
      console.error("Erro ao buscar projeto: ", err);
      return res.status(500).json({ error: "Erro ao buscar projeto" })
    }
  }

  async create(req, res) {
    try {
      const project = await Project.create(req.body);
      return res.status(201).json(project);
    } catch (err) {
      console.error("Erro ao criar novo projeto: ", err);
      return res.status(400).json({ error: "Erro ao criar novo projeto." })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Project.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).json({ error: "Projeto não encontrado" });
      }

      return res.status(200).json({ message: "Projeto deletado com sucesso!" });

    } catch (err) {
      console.error("Erro ao deletar projeto!");
      return res.status(400).json({ error: "Erro ao deletar projeto" })
    }
  }
}

export default new ProjectController();