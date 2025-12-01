import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Rotas básicas da API", () => {
  it("GET /api/health deve retornar 200 e mensagem correta", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("UP");
    expect(res.body).toHaveProperty("timestamp");
    expect(res.body).toHaveProperty("uptime");
  });

  it("GET /api deve retornar mensagem de boas-vindas", async () => {
    const res = await request(app).get("/api");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Hello from thiagomagano.com.br API");
  });
});