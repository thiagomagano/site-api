import mongoose from "mongoose";
import { config } from "./env.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri);

    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erro ao conectar no MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
