import { Router } from "express";
import AnuncioController from "../controllers/anuncio.controller.js";
import { tryCatch } from "../utils/tryCatch.js";

const anuncioRotas = Router();

anuncioRotas.post("/criar", tryCatch(AnuncioController.criarAnuncio)); // Criar anuncio

anuncioRotas.get("/ler/:id", tryCatch(AnuncioController.lerAnuncio)); // Ler um anuncio específica

anuncioRotas.get("/lertodos", tryCatch(AnuncioController.lerTodosAnuncio)) // Ler todos anuncio

anuncioRotas.put("/:id", tryCatch(AnuncioController.updateAnuncio)); // Atualizar anuncio

anuncioRotas.delete("/:id", tryCatch(AnuncioController.deletarAnuncio)); // Deletar anuncio

export default anuncioRotas;
