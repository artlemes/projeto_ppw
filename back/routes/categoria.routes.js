import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const categoriaRotas = Router();

categoriaRotas.post("/", tryCatch(CategoriaController.criarCategoria));

categoriaRotas.get("/buscar", tryCatch(CategoriaController.buscarCategorias));

categoriaRotas.patch("/:id", tryCatch(CategoriaController.atualizarCategoria));

categoriaRotas.delete("/:id", tryCatch(CategoriaController.excluirCategoria));

export default categoriaRotas;
