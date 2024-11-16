import Container from "../../components/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./Cadastro.module.css";
import React, { useState } from 'react';

function Cadastro({ onSubmit }) { 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
          alert('As senhas não coincidem');
          return;
        }
        onSubmit({ name, email, password });
      };

  return (
    <>
      <Header/>
      <Container>
        <section className={styles.login}>
            <h1>Cadastro</h1>

            <form onSubmit={handleSubmit}>
            <label>
                Nome:
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                Senha:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            <label>
                Confirmar Senha:
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </label>
            <button type="submit">Cadastrar</button>
            </form>

        </section>

      </Container>
      <Footer/>
    </>
  );
}

export default Cadastro;
