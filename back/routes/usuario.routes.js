import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { checkToken } from "../middlewares/authenticate.js";

const usuarioRotas = Router();

usuarioRotas.post("/", tryCatch(UsuarioController.criarUsuario));

usuarioRotas.get("/buscar", tryCatch(UsuarioController.buscarUsuarios));

usuarioRotas.get(
  "/logado",
  checkToken,
  tryCatch(UsuarioController.buscarUsuarioLogado)
);

usuarioRotas.patch(
  "/:id",
  checkToken,
  tryCatch(UsuarioController.atualizarUsuario)
);

usuarioRotas.delete(
  "/:id",
  checkToken,
  tryCatch(UsuarioController.excluirUsuario)
);

usuarioRotas.put(
  "/senha/:id",
  checkToken,
  tryCatch(UsuarioController.atualizarSenha)
);

export default usuarioRotas;
