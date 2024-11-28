import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { checkToken } from "../middlewares/authenticate.js";

const categoriaRotas = Router();

categoriaRotas.post("/", tryCatch(CategoriaController.criarCategoria));

categoriaRotas.get("/buscar", tryCatch(CategoriaController.buscarCategorias));

categoriaRotas.patch(
  "/:id",
  checkToken,
  tryCatch(CategoriaController.atualizarCategoria)
);

categoriaRotas.delete(
  "/:id",
  checkToken,
  tryCatch(CategoriaController.excluirCategoria)
);

export default categoriaRotas;
