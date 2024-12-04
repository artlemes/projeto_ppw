import Container from "../../components/Container";
import styles from "./Login.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fazerLogin } from "../../services/apiService";

function Login({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fazerLogin({ email, senha });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login realizado com sucesso");
        navigate("/anuncio/buscar");
        // redireciona depois pro dashboard
      } else {
        const errorData = await response.json();
        alert("Erro no login: " + errorData.message);
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <>
      <Container>
        <section className={styles.login}>
          <div className={styles.logoWrapper}>
            <img src="/images/logopgw2.png" alt="Logo" />
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </label>
            <button type="submit">Entrar</button>
            <Link to="/cadastro">Cadastra-se</Link>
          </form>

          <div className={styles.logoWrapper2}>
            <img src="/images/vertical_sigla_fundo_claro.png" />
          </div>
        </section>
      </Container>
    </>
  );
}

export default Login;
