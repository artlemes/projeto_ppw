import React from "react";
import { Button, FlexboxGrid, Panel } from "rsuite";
import { Edit, Trash } from "@rsuite/icons";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate

function AnuncioCard({ imageUrl, titulo, onEdit, onDelete, id, onClick }) {
    const navigate = useNavigate(); // Instancia o hook useNavigate para navegação

    // Função para redirecionar para a página de visualização do anúncio
    const handleCardClick = () => {
        if (onClick) {
            
            navigate(`/anuncio/ver/${id}`) // Executa a função onClick do card, que é a navegação para /anuncio/ver/:id
        }
    };

    // Função para redirecionar para a página de edição
    const handleEditClick = (event) => {
        event.stopPropagation(); // Impede a propagação do clique para o card (evita navegação para /ver/:id)
        if (onEdit) {
            onEdit(); // Executa a função onEdit, que redireciona para /anuncio/editar/:id
        }
    };

    // Função para excluir o anúncio
    const handleDeleteClick = (event) => {
        event.stopPropagation(); // Impede a propagação do clique para o card (evita navegação para /ver/:id)
        if (onDelete) {
            onDelete(); // Executa a função onDelete, que lida com a exclusão do anúncio
        }
    };

    return (
        <Panel bordered className="mb-3" style={{ width: "400px" }} onClick={handleCardClick}>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={6}>
                    <img
                        src={imageUrl}
                        alt="Imagem do anúncio"
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                        }}
                    />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={18} style={{ paddingLeft: 20 }}>
                    <p>{titulo}</p>
                    <div style={{ marginTop: 15 }}>
                        <Button 
                            appearance="subtle" 
                            startIcon={<Edit />} 
                            style={{ marginRight: 10 }} 
                            onClick={handleEditClick} // Usando a função separada para evitar conflito com o clique do card
                        >
                            Editar anúncio
                        </Button>
                        <Button 
                            color="red" 
                            appearance="subtle" 
                            startIcon={<Trash />} 
                            onClick={handleDeleteClick} // Usando a função separada para evitar conflito com o clique do card
                        >
                            Excluir anúncio
                        </Button>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </Panel>
    );
}

export default AnuncioCard;
