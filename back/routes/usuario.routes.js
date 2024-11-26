import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const usuarioRotas = Router();

usuarioRotas.post("/login", tryCatch(UsuarioController.loginUsuario));

usuarioRotas.post("/criar", tryCatch(UsuarioController.criarUsuario));

usuarioRotas.post("/deletar", tryCatch(UsuarioController.deletarUsuario));

usuarioRotas.post("/update", tryCatch(UsuarioController.updateUsuario));

usuarioRotas.get("/ler", tryCatch(UsuarioController.lerUsuario));

export default usuarioRotas;
