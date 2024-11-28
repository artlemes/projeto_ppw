import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { checkToken } from "../middlewares/authenticate.js";
import { adminCheck } from "../middlewares/adminCheck.js";

const categoriaRotas = Router();

categoriaRotas.post(
  "/",
  checkToken,
  adminCheck,
  tryCatch(CategoriaController.criarCategoria)
);

categoriaRotas.get("/buscar", tryCatch(CategoriaController.buscarCategorias));

categoriaRotas.patch(
  "/:id",
  checkToken,
  adminCheck,
  tryCatch(CategoriaController.atualizarCategoria)
);

categoriaRotas.delete(
  "/:id",
  checkToken,
  adminCheck,
  tryCatch(CategoriaController.excluirCategoria)
);

export default categoriaRotas;
