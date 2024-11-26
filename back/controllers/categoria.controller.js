//importei os que temos por enquanto
import { categoriaModel } from "../models/categoria.model.js";
import ServerError from "../ServerError.js";
import { CATEGORIA_ERROR } from "../constants/errorCodes.js";

class CategoriaController {

  async criarCategoria(req, res) {
    const { nome, descricao } = req.body;

    if (!nome || !descricao) {
      throw new ServerError(CATEGORIA_ERROR.CAMPOS_NAO_PREENCHIDOS);
    }

    const categoriaExiste = await categoriaModel.findOne({
      $or: [{ nome }, { descricao }],
    });

    if (categoriaExiste) {
      throw new ServerError(CATEGORIA_ERROR.CATEGORIA_JA_EXISTE);
    }

    const novaCategoria = {
      nome,
      descricao
    };

    await categoriaModel.create(novaCategoria);

    return res.status(204).send();
  }

  async lerCategoria(req, res) {

    //pegando a id na url da requisicao
    const id = req.params.id;

    const categoria = await categoriaModel.findById(id);

    if (!categoria) {
      throw new ServerError(CATEGORIA_ERROR.CATEGORIA_NAO_ENCONTRADA);
    }

    return res.status(200).json(categoria);
  }

  async lerTodasCategorias(req, res) {
    try {
      // Busca todos os documentos na coleção
      const categorias = await categoriaModel.find({});
  
      // Verifica se há categorias no banco
      if (!categorias || categorias.length === 0) {
        return res.status(404).json({ error: "Nenhuma categoria encontrada." });
      }
  
      // Retorna a lista de categorias
      return res.status(200).json(categorias);
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  async deletarCategoria(req, res) {
    //adquirindo o id da requisicao
    const id = req.params.id;

    //excluindo a categoria do banco
    await categoriaModel.findByIdAndDelete(id);

    // retornando um status 204
    return res.status(204).send();
  }

  async updateCategoria(req, res) {
    //adquirindo o id da requisicao
    const id = req.params.id;

    await categoriaModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // retornando um status 204
    return res.status(204).send();
  }
}

export default new CategoriaController();
