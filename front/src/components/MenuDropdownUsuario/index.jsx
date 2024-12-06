import React from "react";
import { Dropdown, Avatar, Button } from "rsuite";
import { useNavigate } from "react-router-dom";

function MenuDropdownUsuario() {
    const navigate = useNavigate(); // Hook para navegação

    const user = JSON.parse(localStorage.getItem("User"));

    const handleSelect = (eventKey) => {
        switch (eventKey) {
            case "profile":
                console.log("Navegar para o perfil do usuário");
                navigate("/perfil", { replace: true });
                break;
            case "settings":
                navigate("/teste", { replace: true });
                console.log("Abrir configurações");
                break;
            case "logout":
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
                console.log("Realizar logout");
                break;
            default:
                break;
        }
    };

    return (
        <Dropdown
            placement="bottomEnd"
            renderToggle={(props, ref) => (
                <Button {...props} ref={ref} appearance="subtle">
                    <Avatar circle style={{ background: "#f56a00" }}>
                        {user['nome'].charAt(0).toUpperCase()}
                    </Avatar>
                </Button>
            )}
            onSelect={handleSelect}>
            <Dropdown.Item eventKey="profile">Perfil</Dropdown.Item>
            <Dropdown.Item eventKey="settings">Configurações</Dropdown.Item>
            <Dropdown.Item eventKey="logout">Sair</Dropdown.Item>
        </Dropdown>
    );
}

export default MenuDropdownUsuario;
