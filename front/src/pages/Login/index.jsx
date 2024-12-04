import Container from "../../components/Container";
import Formulario from "../../components/Formulario";
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
            <Formulario>
                <div className={styles.logoWrapper}>
                    <img src="/images/logopgw2.png" alt="Logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p></p>
                    <input
                        type="email" placeholder="E-mail"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password" placeholder="Senha"
                        value={senha} onChange={(e) => setSenha(e.target.value)}
                    />
                    <p></p>
                    <button type="submit">Entrar</button>
                    <Link to="/cadastro">
                        <p style={{fontWeight: "bold"}}>Cadastre-se</p>
                    </Link>
                </form>
                <div className={styles.logoWrapper2}>
                    <img src="/images/vertical_sigla_fundo_claro.png" />
                </div>
            </Formulario>
        </Container>
		</>
	);
}

export default Login;
