import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import { config } from "dotenv";
// import { connectToDatabase } from "./database/connect.js";
import routes from "./routes/routes.js";
// import { errorHandler } from "./middleware/errorHandler.js";

// config();

// connectToDatabase();

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use("/", routes);
// server.use(errorHandler);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Rodando na porta ${port}!`);
  console.log(`Abra seu navegador em: http://127.0.0.1:${port}`);
});
