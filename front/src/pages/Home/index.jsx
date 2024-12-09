import BannerRSuite from "../../components/BannerRSuite/BannerRSuite";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./Home.module.css";
import {useNavigate} from "react-router-dom";


function Home() {  //renderiza
    const navigate = useNavigate();
    // função para realizar o logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // remove o token
        navigate("/login"); // redireciona para a pagina de login
    };

  return (
    <>
      <Header botoesDireita={[
          { link: "#", legenda: "Sair", onClick: handleLogout }
      ]}></Header>
      <BannerRSuite></BannerRSuite>

      <Footer></Footer>
    </>
  );
}

export default Home;
