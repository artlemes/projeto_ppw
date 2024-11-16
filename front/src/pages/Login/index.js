import Container from "../../components/Container";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./Login.module.css";
import React, { useState } from 'react';
import { Link } from "react-router-dom"


function Login({ onSubmit }) { 

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <>
      <Header/>
      <Container>
        <section className={styles.login}>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
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
              <button type="submit">Entrar</button>
            </form>

            <Link to="/cadastro">Cadastra-se</Link>

        </section>

      </Container>
      <Footer/>
    </>
  );
}

export default Login;
