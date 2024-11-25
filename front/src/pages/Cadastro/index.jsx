import Container from "../../components/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./Cadastro.module.css";
import React, { useState } from 'react';
import { cadastrarUsuario } from '../../services/apiService';

function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validações básicas no frontend
    if (!name || !email || !cpf || !password || !confirmPassword) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    try {
      // Chamada ao serviço de cadastro
      const response = await cadastrarUsuario({ name, email, cpf, password });
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setName('');
        setEmail('');
        setCpf('');
        setPassword('');
        setConfirmPassword('');
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
    <>
      <Header />
      <Container>
        <section className={styles.cadastro}>
          <form onSubmit={handleSubmit}>
            <h1>Cadastro</h1>

            <label>
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            
            <label>
              CPF:
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                maxLength="11"
                required
              />
            </label>
            
            <label>
              Senha:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            
            <label>
              Confirmar Senha:
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            
            <button type="submit">Cadastrar</button>
          </form>
        </section>
      </Container>
      <Footer />
    </>
  );
}

export default Cadastro;