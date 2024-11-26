import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const usuarioRotas = Router();

usuarioRotas.post("/criar", tryCatch(UsuarioController.criarUsuario));

usuarioRotas.get("/ler", tryCatch(UsuarioController.lerUsuario));

export default usuarioRotas;
