import React, {useEffect} from 'react';
import {Container, Header, Content, Footer, Sidebar} from 'rsuite';
import 'rsuite/dist/rsuite.min.css';

import NossoHeader from "../../components/Header";
import NossoFooter from "../../components/Footer";
import ProfileSider from "../../components/ProfileSider";
import {useNavigate} from "react-router-dom";

function Padrao({children}) {
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
        <Container>
            <Header>
                <NossoHeader
                    botoesDireita={[
                        { link: "#", legenda: "Sair", onClick: handleLogout }
                    ]}
                />
            </Header>
            <Container>
                <Sidebar><ProfileSider /></Sidebar>
                <Content><div style={{margin: '20px'}}>{children}</div></Content>
            </Container>
            <Footer>
                <NossoFooter />
            </Footer>
        </Container>
    );
}

export default Padrao;