import styles from "./ProfileSider.module.css"
import {Avatar, Button, Container, Divider, Nav} from "rsuite";
import React from "react";

function ProfileSider() {
    return (
        <>
            <Container className={styles.profileSider}>
                <Avatar
                    circle
                    src="https://wallpapers.com/images/high/best-profile-pictures-x936iuuogvln5oxj.webp"
                    size="lg"
                    style={{marginBottom: 15}}
                />
                <h4>Nome do usuário</h4>
                <Divider />
                <Nav vertical>
                    <Nav.Item>
                        <Button block appearance="primary">
                            Anúncios
                        </Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button block appearance="default">
                            Editar perfil
                        </Button>
                    </Nav.Item>
                </Nav>
            </Container>
        </>
    )
}

export default ProfileSider