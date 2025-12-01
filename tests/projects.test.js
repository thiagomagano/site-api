import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { connectMemoryDB, disconnectMemoryDB, clearCollections } from "./mongo-memory.js";
import Project from "../src/models/Project.js";



describe("Rotas de /projects (com mongo em memória)", () => {
  beforeAll(async () => {
    await connectMemoryDB();
  });

  beforeEach(async () => {
    await clearCollections();
  })

  afterAll(async () => {
    await disconnectMemoryDB();
  });

  describe("GET /api/projects", async () => {

    it("deve responder com status 200 e array bazio quando não há projetos", async () => {
      const res = await request(app).get("/api/projects");

      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    })

    it("deve retornar todos os projetos quando existem", async () => {
      await Project.create({
        title: "Projeto 1",
        description: "Descrição do projeto 1",
        stack: ["nodedotjs", "express"],
      });

      await Project.create({
        title: "Projeto 2",
        description: "Descrição do projeto 2",
        stack: ["react", "svelte"],
      });


      const res = await request(app).get("/api/projects");

      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0]).toHaveProperty("_id");
      expect(res.body[0]).toHaveProperty("title");
    })
  });

  describe("GET /api/projects/:id", () => {
    it("deve retornar 404 quando projeto não existe", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const res = await request(app).get(`/api/projects/${fakeId}`);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("Projeto não encontrado");
    });

    it("deve retornar o projeto quando existe", async () => {
      const project = await Project.create({
        title: "Projeto Teste",
        description: "Descrição teste",
        stack: ["nodedotjs", "express", "mongo"],
      });

      const res = await request(app).get(`/api/projects/${project._id}`);

      expect(res.status).toBe(200);
      expect(res.body._id).toBe(project._id.toString());
      expect(res.body.title).toBe("Projeto Teste");
    });
  });
});