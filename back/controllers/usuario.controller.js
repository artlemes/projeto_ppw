import { usuarioModel } from "../models/usuario.model.js";
import { anuncioModel } from "../models/anuncio.model.js";
import ServerError from "../ServerError.js";
import { USUARIO_ERROR } from "../constants/errorCodes.js";
import { validateId } from "../utils/validateId.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new ServerError(USUARIO_ERROR.LOGIN_INVALIDO);
    }

    // Gerar token de autenticação
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: usuario._id }, secret, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
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

    const salt = await bcrypt.genSalt(12);
    const hashedSenha = await bcrypt.hash(senha, salt);

    const novoUsuario = {
      nome,
      email,
      cpf,
      senha: hashedSenha,
    };

    await usuarioModel.create(novoUsuario);

    return res.status(204).send();
  }

  async buscarUsuarios(req, res) {
    const { id, cpf } = req.query;
    let query = {};

    if (id) {
      validateId(id);
      query._id = id;
    }

    if (cpf) {
      query.cpf = cpf;
    }

    const usuarios = await usuarioModel.findById(id, "-senha -__v");
    if (!usuarios) {
      // throw new ServerError(USUARIO_ERROR.USUARIO_NAO_ENCONTRADO);
      return res.status(200).json({ message: "Nenhum usuário foi encontrado" });
    }

    return res.status(200).json(usuarios);
  }

  async buscarUsuarioLogado(req, res) {
    const id = req.usuarioId;

    const usuario = await usuarioModel.findById(id, "-senha -__v");

    if (!usuario) {
      throw new ServerError(USUARIO_ERROR.USUARIO_NAO_ENCONTRADO);
    }

    return res.status(200).json(usuario);
  }

  async excluirUsuario(req, res) {
    //adquirindo o id da requisicao
    const id = req.params.id;

    //excluindo o relacionamento entre o usuario e os anuncios
    await anuncioModel.deleteMany({ usuario_id: id });

    //excluindo o usuario do banco
    await usuarioModel.findByIdAndDelete(id);

    // retornando um status 204
    return res.status(204).send();
  }

  async atualizarUsuario(req, res) {
    //adquirindo o id da requisicao
    const id = req.params.id;

    await usuarioModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // retornando um status 204
    return res.status(204).send();
  }

  async atualizarSenha(req, res) {
    const id = req.usuarioId;

    const { senhaAntiga, senhaNova } = req.body;

    if (req.usuarioId != id) {
      throw new ServerError(TOKEN_ERROR.ACESSO_NEGADO);
    }

    const usuario = await usuarioModel.findById(id);

    const senhaCorreta = await bcrypt.compare(senhaAntiga, usuario.senha);
    if (!senhaCorreta) {
      throw new ServerError(USUARIO_ERROR.SENHA_INCORRETA);
    }

    const salt = await bcrypt.genSalt(12);
    const hashedSenha = await bcrypt.hash(senhaNova, salt);

    await usuarioModel.findByIdAndUpdate(id, { senha: hashedSenha });

    return res.status(204).send();
  }
}

export default new UsuarioController();
