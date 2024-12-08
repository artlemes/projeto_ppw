import Container from "../../components/Container";
import Formulario from "../../components/Formulario";
import Footer from "../../components/Footer";
import styles from "./RecuperarSenha.module.css";

function RecuperarSenha() {

	return (
		<>
		<Container>
			<Formulario>
				<form>
					<h3>Recuperar senha</h3>
					<p></p>
					<input
						type="email" name="email" placeholder="E-mail do seu cadastro"
						required
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

export default RecuperarSenha;
