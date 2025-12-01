import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";
import { config } from "../src/config/env.js";
import { beforeAll } from "vitest";
import { afterAll } from "vitest";


describe("Rotas de /projects", () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoUri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("GET /api/projects deve responder com status 200", async () => {
    const res = await request(app).get("/api/projects");

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  })
});