import { mongoose } from "mongoose";
import { config } from "dotenv";

config();

const uri = process.env.MONGO_URI;

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Conectado com sucesso ao banco de dados!");
  } catch (error) {
    console.error("Ocorreu um erro ao conectar ao banco de dados:", error);
  }
};
