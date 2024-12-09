import styles from "./ProfileSider.module.css";
import { Avatar, Button, Container, Divider, Nav } from "rsuite";
import React from "react";
import { useNavigate } from "react-router-dom";

function ProfileSider() {
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("User"));

    return (
        <Container className={styles.profileSider}>
            <Avatar
                circle
                src="https://img.myloview.com.br/adesivos/usuario-icone-linear-ilustracao-vetorial-isolada-no-fundo-branco-700-154081922.jpg"
                size="lg"
                style={{ marginBottom: 15 }}
            />
            <h4>{user.nome}</h4>
            <Divider />
            <Nav vertical>
                <Nav.Item>
                    <Button block appearance="primary" onClick={() => navigate("/listagem")}>
                        Anúncios
                    </Button>
                </Nav.Item>
                <Nav.Item>
                <Button
                    block
                    appearance="default"
                    onClick={() => navigate("/perfil/editar")}
                    >
                    Editar perfil
                </Button>
                </Nav.Item>
            </Nav>
        </Container>
    );
}

export default ProfileSider;
