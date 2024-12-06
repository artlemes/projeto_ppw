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

      <Container> 
        
      <h2 className={styles.heading}>Produtos</h2>
      <section className="cards">
        <Card></Card> {/*depois passa os parametros pra mudar cada parte, etc., altera a função tambem pra receber*/}
        <Card></Card>
        <Card></Card>
      </section>

      <h2>Moradia</h2>
      <section className="cards">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </section>

      <h2>Serviços</h2>
      <section className="cards">
        <Card></Card>
        <Card></Card>
        <Card></Card>
      </section>

      </Container>

      <Footer></Footer>
    </>
  );
}

export default Home;
