import { categoriaModel } from "../models/categoria.model.js";
import { anuncioModel } from "../models/anuncio.model.js";
import ServerError from "../ServerError.js";
import { CATEGORIA_ERROR } from "../constants/errorCodes.js";
import { validateId } from "../utils/validateId.js";

class CategoriaController {
  async criarCategoria(req, res) {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      throw new ServerError(CATEGORIA_ERROR.CAMPOS_NAO_PREENCHIDOS);
    }

    const categoriaExiste = await categoriaModel.findOne({ nome });
    if (categoriaExiste) {
      throw new ServerError(CATEGORIA_ERROR.CATEGORIA_JA_EXISTE);
    }

    const novaCategoria = {
      nome,
      descricao,
    };

    await categoriaModel.create(novaCategoria);

    return res.status(204).send();
  }

  async buscarCategorias(req, res) {
    const { id, nome } = req.query;
    let query = {};

    if (id) {
      validateId(id);
      query._id = id;
    }

    if (nome) {
      query.nome = nome;
    }

    const categorias = await categoriaModel.findById(query, "-__v");

    if (!categorias) {
      // throw new ServerError(CATEGORIA_ERROR.CATEGORIA_NAO_ENCONTRADA);
      return res
        .status(200)
        .json({ message: "Nenhuma categoria foi encontrada" });
    }

    return res.status(200).json(categorias);
  }

  async excluirCategoria(req, res) {
    const id = req.params.id;

    await anuncioModel.deleteMany({ categoria_id: id });

    const categoriaExcluida = await categoriaModel.findByIdAndDelete(id);
    if (!categoriaExcluida) {
      throw new ServerError(CATEGORIA_ERROR.CATEGORIA_NAO_ENCONTRADA);
    }

    return res.status(204).send();
  }

  async atualizarCategoria(req, res) {
    const id = req.params.id;

    const categoriaAtualizada = await categoriaModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    if (!categoriaAtualizada) {
      throw new ServerError(CATEGORIA_ERROR.CATEGORIA_NAO_ENCONTRADA);
    }

    return res.status(204).send();
  }
}

export default new CategoriaController();
