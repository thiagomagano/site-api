import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { connectMemoryDB, disconnectMemoryDB, clearCollections } from "./mongo-memory.js";



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

  it("GET /api/projects deve responder com status 200 e array", async () => {
    const res = await request(app).get("/api/projects");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  })
});