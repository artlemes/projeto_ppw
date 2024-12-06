import styles from "./CriarAnuncio.module.css"
import Header from "../../components/Header";
import Sider from "../../components/Sider";
import { useNavigate } from "react-router-dom";
import ProfileSider from "../../components/ProfileSider/index.jsx"
import Footer from "../../components/Footer/index.jsx"

function CriarAnuncio() {

    const navigate = useNavigate();

    // aqui verifica se o token ta presente ao carregar a página
    //useEffect(() => {
        //const token = localStorage.getItem("token");
        //if (!token) {
            //navigate("/login"); // redireciona para o login se o token não existir
        //}
    //}, [navigate]);

    // função para realizar o logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // remove o token
        navigate("/login"); // redireciona para a pagina de login
    };

    return (
        <>
        <div className={styles.fundoPagina}>
            <Header
                botoesDireita={[
                    { link: "#", legenda: "Sair", onClick: handleLogout }
                ]}
            />
            <Sider />
            <ProfileSider></ProfileSider>
            <div className={styles.profile}>
                <h2 className={styles.profileTitle}>Criar anúncio</h2>
                <div className={styles.meuAnuncio}>
                    <img className={styles.imagemCateg} src='https://cdn-icons-png.flaticon.com/128/3774/3774278.png'></img>
                    <input className={styles.tituloAnuncio} placeholder="Insira o título!" />
                    <select className={styles.categoriaAnuncio} id="categorias"> 
                        <option>Selecione a categoria</option>
                        <option>Qualquer</option>
                    </select>
                    <textarea className={styles.descricaoAnuncio} rows="10" cols="50" placeholder="Insira a descrição aqui!"></textarea>
                    <button className={styles.botao}>Criar anúncio</button>
                </div>
            </div>
            <Sider />            
            {/* Botão de Sair adicional, caso queira outro fora do Header */}
            <div className={styles.logoutContainer}>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Sair
                </button>
            </div>
        </div>
        <Footer></Footer>
        </>
    );
}

export default CriarAnuncio;