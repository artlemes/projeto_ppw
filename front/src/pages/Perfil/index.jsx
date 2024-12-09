import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Loader } from "rsuite";
import AnuncioCard from "../../components/AnuncioCard";
import useSendData from "../../services/useSendData";

function Perfil({ tituloDaPagina }) {
    const { sendData, loading, error, data } = useSendData();
    const navigate = useNavigate();

    // Estado para armazenar o ID do usuário logado
    const [userId, setUserId] = useState(null);

    // Função para obter o ID do usuário logado
    const getUserId = () => {
        const user = JSON.parse(localStorage.getItem("User"));
        return user ? user.id : null;  // Ajuste conforme a sua estrutura de armazenamento de usuário
    };

    const handleClick = () => {
        navigate('/criaranuncio');
    };

    useEffect(() => {
        // Obter o ID do usuário logado
        const loggedUserId = getUserId();
        setUserId(loggedUserId);

        // Enviar requisição para buscar os anúncios
        sendData("anuncio/buscar", null, "GET");
    }, [sendData]);

    const handleEdit = (id) => {
        navigate(`/anuncio/editar/${id}`);
    };

    const handleDelete = (id) => {
        console.log(`Excluir anúncio com ID: ${id}`);
    };

    const handleAnuncioClick = (id) => {
        navigate(`/anuncio/ver/${id}`);
    };

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Loader size="lg" content="Carregando anúncios..." />
            </div>
        );
    }

    if (error) {
        return <p>Erro ao carregar os anúncios: {error.message}</p>;
    }

    // Verifica se o userId foi obtido corretamente antes de filtrar os anúncios
    const filteredAnuncios = data && Array.isArray(data) && userId
        ? data.filter((anuncio) => anuncio.usuario_id === userId)  // Verifica se o anuncio pertence ao usuário logado
        : [];

    return (
        <>
            <h2 style={{ paddingTop: "120px" }}>{tituloDaPagina}</h2>
            <Button appearance="primary" onClick={handleClick}>Criar anúncio</Button>
            <Divider>
                <h3>Anúncios postados</h3>
            </Divider>
            {filteredAnuncios.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {filteredAnuncios.map((anuncio) => (
                        <AnuncioCard
                            key={anuncio._id}
                            id={anuncio._id}
                            onEdit={() => handleEdit(anuncio._id)}
                            onDelete={() => handleDelete(anuncio._id)}
                            onSee={() => handleAnuncioClick(anuncio._id)}
                            imageUrl={anuncio.imageUrl || "https://cdn-icons-png.flaticon.com/128/3774/3774278.png"}
                            titulo={anuncio.titulo || "Descrição indisponível"}
                        />
                    ))}
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                    <p>Você ainda não publicou nenhum anúncio.</p>
                    <Button appearance="primary" onClick={handleClick}>Criar seu primeiro anúncio</Button>
                </div>
            )}
        </>
    );
}

export default Perfil;
