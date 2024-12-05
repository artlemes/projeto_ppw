import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sider from "../../components/Sider/index.jsx";
import ProfileBackground from "../../components/Profile-background/index.jsx";
import styles from "./Perfil.module.css";
import Header from "../../components/Header";

function Perfil() {
    const navigate = useNavigate();

    // aqui verifica se o token ta presente ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login"); // redireciona para o login se o token não existir
        }
    }, [navigate]);

    // função para realizar o logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // remove o token
        navigate("/login"); // redireciona para a pagina de login
    };

    return (
        <div className={styles.fundoPagina}>
            <Header
                botoesDireita={[
                    { link: "#", legenda: "Sair", onClick: handleLogout }
                ]}
            />
            <Sider />
            <ProfileBackground tituloDaPagina={"Meus anúncios"} />
            <Sider />
            
            {/* Botão de Sair adicional, caso queira outro fora do Header */}
            <div className={styles.logoutContainer}>
                <button onClick={handleLogout} className={styles.logoutButton}>
                    Sair
                </button>
            </div>
        </div>
    );
}

export default Perfil;