import { Router } from "express";
import AnuncioController from "../controllers/anuncio.controller.js";
import { tryCatch } from "../utils/tryCatch.js";
import { checkToken } from "../middlewares/authenticate.js";

const anuncioRotas = Router();

anuncioRotas.post("/", tryCatch(AnuncioController.criarAnuncio));

anuncioRotas.get("/buscar", tryCatch(AnuncioController.buscarAnuncios));

anuncioRotas.patch(
  "/:id",
  checkToken,
  tryCatch(AnuncioController.atualizarAnuncio)
);

anuncioRotas.delete(
  "/:id",
  checkToken,
  tryCatch(AnuncioController.excluirAnuncio)
);

export default anuncioRotas;
