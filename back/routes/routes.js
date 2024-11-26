import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import { checkToken } from "../middlewares/authenticate.js";
import { tryCatch } from "../utils/tryCatch.js";
import usuarioRotas from "./usuario.routes.js";

const routes = Router();

// Rota pública
routes.post("/login", tryCatch(UsuarioController.loginUsuario));

// Rota privada
routes.use("/user", usuarioRotas);

// 404 - Not Found
routes.use((req, res) => {
  res.status(404).send({ Msg: "404 - Not Found" });
});

export default routes;
