import Container from "../../components/Container";
import Formulario from "../../components/Formulario";
import Footer from "../../components/Footer";
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
		<>
		<Container>
			<Formulario>

				<form onSubmit={handleSubmit}>
					<h3>Cadastro</h3>
					<p></p>
					<input
						type="text" name="nome" placeholder="Nome"
						value={formData.nome} onChange={handleChange} required
					/>
					<input
						type="text" name="sobrenome" placeholder="Sobrenome"
						value={formData.sobrenome} onChange={handleChange} required
					/>
					<input
						type="text" name="cpf" placeholder="CPF"
						value={formData.cpf} onChange={handleChange} maxLength="14" required
					/>
					<p></p>
					<input
						type="email" name="email" placeholder="E-mail"
						value={formData.email} onChange={handleChange} required
					/>
					<input
						type="text" name="telefone" placeholder="Telefone"
						value={formData.telefone} onChange={handleChange} required
					/>
					<input
						type="text" name="cep" placeholder="CEP"
						value={formData.cep} onChange={handleChange} maxLength="9" required
					/>
					<p></p>
					<input
						type="password" name="senha" placeholder="Senha"
						value={formData.senha} onChange={handleChange} required
					/>
					<input
						type="password" name="confirmarSenha" placeholder="Confirmar Senha"
						value={formData.confirmarSenha} onChange={handleChange} required
					/>
					<p></p>
					<button type="submit">Cadastrar</button>
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

export default Cadastro;
