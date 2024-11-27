import { connectToDatabase } from "./database/connect.js";
import { usuarioModel } from "./models/usuario.model.js";
import { categoriaModel } from "./models/categoria.model.js";
import { anuncioModel } from "./models/anuncio.model.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Conecta ao banco de dados
await connectToDatabase();

// Função para criar usuários com hash de senha
const criarUsuarios = async (quantidade = 10) => {
  const usuarios = [];
  for (let i = 0; i < quantidade; i++) {
    const salt = await bcrypt.genSalt(12);
    const hashedSenha = await bcrypt.hash("senha123", salt); // Senha padrão para os usuários fictícios

    usuarios.push({
      nome: faker.person.fullName(), // Método atualizado
      email: faker.internet.email(),
      cpf: faker.number.int({ min: 10000000000, max: 99999999999 }).toString(), // Método corrigido
      senha: hashedSenha,
    });
  }

  const resultado = await usuarioModel.insertMany(usuarios);
  console.log(`${quantidade} usuários criados com sucesso!`);

  // Validação: verificar se os usuários foram inseridos
  const usuariosCadastrados = await usuarioModel.find({
    email: { $in: usuarios.map((u) => u.email) },
  });
  console.log(
    `Total de usuários cadastrados no banco: ${usuariosCadastrados.length}`
  );
};

// Função para criar categorias
const criarCategorias = async (quantidade = 5) => {
  const categorias = [];
  for (let i = 0; i < quantidade; i++) {
    categorias.push({
      nome: faker.commerce.department(),
      descricao: faker.lorem.sentence(),
    });
  }
  const categoriasCriadas = await categoriaModel.insertMany(categorias);
  console.log(`${quantidade} categorias criadas com sucesso!`);

  // Validação: verificar se as categorias foram inseridas
  const categoriasCadastradas = await categoriaModel.find({
    nome: { $in: categorias.map((c) => c.nome) },
  });
  console.log(
    `Total de categorias cadastradas no banco: ${categoriasCadastradas.length}`
  );

  return categoriasCriadas;
};

// Função para criar anúncios
const criarAnuncios = async (quantidade = 20, categorias) => {
  const anuncios = [];
  for (let i = 0; i < quantidade; i++) {
    const categoriaAleatoria =
      categorias[Math.floor(Math.random() * categorias.length)];
    anuncios.push({
      titulo: faker.commerce.productName(),
      descricao: faker.commerce.productDescription(),
      preco: faker.commerce.price(),
      categoria_id: categoriaAleatoria._id,
    });
  }
  await anuncioModel.insertMany(anuncios);
  console.log(`${quantidade} anúncios criados com sucesso!`);

  // Validação: verificar se os anúncios foram inseridos
  const anunciosCadastrados = await anuncioModel.find({
    titulo: { $in: anuncios.map((a) => a.titulo) },
  });
  console.log(
    `Total de anúncios cadastrados no banco: ${anunciosCadastrados.length}`
  );
};

// Função principal para popular o banco
const popularBanco = async () => {
  try {
    // Limpa os dados antigos
    await usuarioModel.deleteMany({});
    await categoriaModel.deleteMany({});
    await anuncioModel.deleteMany({});
    console.log("Dados antigos removidos com sucesso!");

    // Popula com novos dados
    await criarUsuarios(10);
    const categorias = await criarCategorias(5);
    await criarAnuncios(20, categorias);

    console.log("Banco de dados populado com sucesso!");
  } catch (error) {
    console.error("Erro ao popular o banco de dados:", error);
  } finally {
    mongoose.connection.close();
  }
};

// Executa a função principal
popularBanco();
