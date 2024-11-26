//importei os que temos por enquanto
import { usuarioModel } from "../models/usuario.model.js.js";
import { anuncioModel } from "../models/anuncio.model.js";
import ServerError from "../ServerError.js";
import { USUARIO_ERROR } from "../constants/errorCodes.js";

class UsuarioController {
  async loginUsuario(req, res) {
    const { email, senha } = req.body;

    //validando os inputs
    if (!email || !senha) {
      //lancando um erro de campos nao preenchidos
      throw new ServerError(USUARIO_ERROR.CAMPOS_NAO_PREENCHIDOS);
    }

    const usuario = await usuarioModel.findOne({ email });

    if (!usuario) {
      throw new ServerError(USUARIO_ERROR.USUARIO_NAO_ENCONTRADO);
    }

    //testar a senha ainda nao sei como faz

    return res.status(200).send("Usuario logado com sucesso");
  }

  async criarUsuario(req, res) {
    const { nome, email, cpf, senha } = req.body;

    if (!nome || !email || !cpf || !senha) {
      throw new ServerError(USUARIO_ERROR.CAMPOS_NAO_PREENCHIDOS);
    }

    const usuarioExiste = await usuarioModel.findOne({
      $or: [{ email }, { cpf }],
    });

    if (usuarioExiste) {
      throw new ServerError(USUARIO_ERROR.USUARIO_JA_EXISTE);
    }

    //aqui ha o espaço para criptografar a senha
    const hashedSenha = senha;

    const novoUsuario = {
      nome,
      email,
      cpf,
      senha: hashedSenha,
    };

    await usuarioModel.create(novoUsuario);

    return res.status(204).send();
  }

  async lerUsuario(req, res) {
    const id = req.userId;

    //acho o usuario no banco mas removo a senha do retorno
    //excluo mais algo do retorno?
    const usuario = await usuarioModel.findById(id, "-senha");

    if (!usuario) {
      throw new ServerError(USUARIO_ERROR.USUARIO_NAO_ENCONTRADO);
    }

    return res.status(200).json(usuario);
  }

  async lerTodosUsuarios(req, res) {
    try {
      // Busca todos os documentos na coleção, omitindo o campo "senha"
      const usuarios = await usuarioModel.find({}, "-senha");
  
      // Verifica se há usuários no banco
      if (!usuarios || usuarios.length === 0) {
        return res.status(404).json({ error: "Nenhum usuário encontrado." });
      }
  
      // Retorna a lista de usuários
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }

  async deletarUsuario(req, res) {
    //adquirindo o id da requisicao
    const id = req.params.id;

    //excluindo o relacionamento entre o usuario e os anuncios
    await anuncioModel.deleteMany({ usuario_id: id });

    //excluindo o usuario do banco
    await usuarioModel.findByIdAndDelete(id);

    // retornando um status 204
    return res.status(204).send();
  }

  async updateUsuario(req, res) {
    //adquirindo o id da requisicao
    const id = req.params.id;

    await usuarioModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // retornando um status 204
    return res.status(204).send();
  }
}

export default new UsuarioController();
