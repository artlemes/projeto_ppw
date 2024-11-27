import { anuncioModel } from "../models/anuncio.model.js";
import { categoriaModel } from "../models/categoria.model.js";
import ServerError from "../ServerError.js";
import { ANUNCIO_ERROR } from "../constants/errorCodes.js";
import { validateId } from "../utils/validateId.js";

class AnuncioController {
  async criarAnuncio(req, res) {
    const { titulo, descricao, preco, categoria_id } = req.body;

    if (!titulo || !descricao || !preco || !categoria_id) {
      throw new ServerError(ANUNCIO_ERROR.CAMPOS_NAO_PREENCHIDOS);
    }

    const categoriaExiste = await categoriaModel.findById(categoria_id);
    if (!categoriaExiste) {
      throw new ServerError(ANUNCIO_ERROR.CATEGORIA_NAO_ENCONTRADA);
    }

    const anuncioExiste = await anuncioModel.findOne({ titulo });
    if (anuncioExiste) {
      throw new ServerError(ANUNCIO_ERROR.ANUNCIO_JA_EXISTE);
    }

    const novoAnuncio = {
      titulo,
      descricao,
      preco,
      categoria_id,
    };

    const anuncioCriado = await anuncioModel.create(novoAnuncio);

    await categoriaModel.findByIdAndUpdate(categoria_id, {
      $push: {
        anuncios: {
          anuncio_id: anuncioCriado._id,
          nome: anuncioCriado.nome,
        },
      },
    });

    return res.status(201).json(anuncioCriado);
  }

  async buscarAnuncios(req, res) {
    const { id, titulo } = req.query;
    let query = {};

    if (id) {
      validateId(id);
      query._id = id;
    }

    if (titulo) {
      query.titulo = titulo;
    }

    const anuncios = await anuncioModel.find(query, "-__v");

    if (!anuncios) {
      return res.status(200).json({ message: "Nenhum anúncio foi encontrado" });
    }

    return res.status(200).json(anuncios);
  }

  async excluirAnuncio(req, res) {
    const id = req.params.id;

    // await categoriaModel.deleteMany(
    //   {},
    //   { $pull: { anuncios: { anuncio_id: id } } }
    // );

    const anuncioExcluido = await anuncioModel.findByIdAndDelete(id);
    if (!anuncioExcluido) {
      throw new ServerError(ANUNCIO_ERROR.ANUNCIO_NAO_ENCONTRADO);
    }

    return res.status(204).send();
  }

  async atualizarAnuncio(req, res) {
    const id = req.params.id;

    const anuncioAtualizado = await anuncioModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (!anuncioAtualizado) {
      throw new ServerError(ANUNCIO_ERROR.ANUNCIO_NAO_ENCONTRADO);
    }

    return res.status(204).send();
  }
}

export default new AnuncioController();
