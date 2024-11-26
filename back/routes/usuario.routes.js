import { Router } from "express";
import UsuarioController from "../controllers/usuario.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import usuarioController from "../controllers/usuario.controller.js";

const usuarioRotas = Router();

usuarioRotas.post("/login", tryCatch(UsuarioController.loginUsuario)); // Login

usuarioRotas.post("/criar", tryCatch(UsuarioController.criarUsuario)); // Criar usuário

usuarioRotas.get("/ler/:id", tryCatch(UsuarioController.lerUsuario)); // Ler um usuário específico

usuarioRotas.get("/lertodos", tryCatch(usuarioController.lerTodosUsuarios)) // Ler todos usuários

usuarioRotas.put("/:id", tryCatch(UsuarioController.updateUsuario)); // Atualizar usuário

usuarioRotas.delete("/:id", tryCatch(UsuarioController.deletarUsuario)); // Deletar usuário

export default usuarioRotas;
