import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sider from "../../components/Sider";
import Footer from "../../components/Footer";
import AnuncioBackGround from "../../components/AnuncioBackGround";



function AnuncioUnico() {

    const navigate = useNavigate();

    // função para realizar o logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // remove o token
        navigate("/login"); // redireciona para a pagina de login
    };

    return (
        <>
        <Header botoesDireita={[{ 
            link: "#", legenda: "Sair", onClick: handleLogout }]}></Header>
        
        <div style={{display:"Flex"}}>
            <Sider></Sider>
            <AnuncioBackGround></AnuncioBackGround>
            <Sider></Sider>
        </div>
        <Footer></Footer>
        </>

    );
}

export default AnuncioUnico;