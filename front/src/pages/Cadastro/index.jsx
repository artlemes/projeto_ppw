import Container from "../../components/Container";
import styles from "./Cadastro.module.css";
import React, { useState } from "react";
import { cadastrarUsuario } from "../../services/apiService";

function Cadastro() {
  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
    cep: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      nome,
      sobrenome,
      email,
      cpf,
      telefone,
      senha,
      confirmarSenha,
      cep,
    } = formData;

    // Validação básica
    if (
      !nome ||
      !sobrenome ||
      !email ||
      !cpf ||
      !telefone ||
      !senha ||
      !confirmarSenha ||
      !cep
    ) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const userData = {
        nome,
        sobrenome,
        email,
        cpf,
        telefone,
        senha,
        cep,
      };

      const response = await cadastrarUsuario(userData);
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setFormData({
          nome: "",
          sobrenome: "",
          email: "",
          cpf: "",
          telefone: "",
          senha: "",
          confirmarSenha: "",
          cep: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <Container>
      <section className={styles.cadastro}>
        <div className={styles.logoWrapper}>
          <img src="/images/logopgw2.png" alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Cadastro</h1>

          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Sobrenome:
            <input
              type="text"
              name="sobrenome"
              value={formData.sobrenome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            CPF:
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              maxLength="14"
              required
            />
          </label>

          <label>
            Telefone:
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            CEP:
            <input
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
              maxLength="9"
              required
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Confirmar Senha:
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit">Cadastrar</button>
        </form>

        <div className={styles.logoWrapper2}>
          <img src="/images/vertical_sigla_fundo_claro.png" />
        </div>
      </section>
    </Container>
  );
}

export default Cadastro;
