import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const usuarioRotas = Router();

usuarioRotas.post("/", tryCatch(UsuarioController.criarUsuario));

usuarioRotas.get("/buscar", tryCatch(UsuarioController.buscarUsuarios));

usuarioRotas.get("/logado", tryCatch(UsuarioController.buscarUsuarioLogado));

usuarioRotas.patch("/:id", tryCatch(UsuarioController.atualizarUsuario));

usuarioRotas.delete("/:id", tryCatch(UsuarioController.excluirUsuario));

usuarioRotas.put("/senha/:id", tryCatch(UsuarioController.atualizarSenha));

export default usuarioRotas;
