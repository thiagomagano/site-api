import connectDB from "./config/database.js";
import app from "./app.js";
import { config } from "./config/env.js";

connectDB();

app.listen(config.port, () => {
  console.log(`thiagomagano.com.br API is running on http://localhost:${config.port}`);
});
