import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const categoriaRotas = Router();

categoriaRotas.post("/criar", tryCatch(CategoriaController.criarCategoria)); // Criar categoria

categoriaRotas.get("/ler/:id", tryCatch(CategoriaController.lerCategoria)); // Ler uma categoria específica

categoriaRotas.get("/lertodos", tryCatch(CategoriaController.lerTodasCategorias)) // Ler todas categoria

categoriaRotas.put("/:id", tryCatch(CategoriaController.updateCategoria)); // Atualizar categoria

categoriaRotas.delete("/:id", tryCatch(CategoriaController.deletarCategoria)); // Deletar categoria

export default categoriaRotas;
