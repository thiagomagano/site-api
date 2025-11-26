import express, { json } from "express";
const app = express();
const port = 3000;

app.use(json());

app.get("/", (req, res) => {
  res.json({ status: 200, msg: "Hello, from Thiagomagano.com.br REST API" });
});

app.get("/api/health", (req, res) => {
  res.json({ status: 200, msg: "API SAUDAVEL!" });
});

app.listen(port, () => {
  console.log(
    `thiagomagano.com.br API is running on port http://localhost:${port}`,
  );
});
