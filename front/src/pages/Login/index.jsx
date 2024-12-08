import Container from "../../components/Container";
import Formulario from "../../components/Formulario";
import Footer from "../../components/Footer";
import styles from "./Login.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fazerLogin } from "../../services/apiService";

function decodeJWT(token) {
    const payloadBase64 = token.split('.')[1]; // Pega a segunda parte do token
    return atob(payloadBase64); // Decodifica de Base64 para string
}

function Login() {
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
                localStorage.setItem("User", decodeJWT(data.token));

                console.log(decodeJWT(data.token));
				navigate("/perfil");
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
                <form onSubmit={handleSubmit}>
                    <h3>Login</h3>
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
                    <p style={{textAlign: "center"}}>
                        <Link to="/cadastro">
                            <span style={{fontWeight: "bold"}}>Cadastrar-se</span>
                        </Link>
                        <p></p><p></p>
                        <Link to="/recuperarSenha">
                            <span style={{fontWeight: "bold"}}>Recuperar senha</span>
                        </Link>
                    </p>
                </form>
                {/* <div className={styles.logoWrapper2}>
                    <img src="/images/vertical_sigla_fundo_claro.png" />
                </div> */}
            </Formulario>
        </Container>
        <Footer></Footer>
		</>
	);
}

export default Login;
