import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {Button, Divider, Loader} from "rsuite";
import AnuncioCard from "../../components/AnuncioCard";
import useSendData from "../../services/useSendData";

function Perfil({tituloDaPagina}) {
    const {sendData, loading, error, data} = useSendData();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/criaranuncio');
    };

    useEffect(() => {
        sendData("anuncio/buscar", null, "GET");
    }, [sendData]);

    const handleEdit = (id) => {
        navigate(`/anuncio/editar/${id}`)
    };

    const handleDelete = (id) => {
        console.log(`Excluir anúncio com ID: ${id}`);
    };

    const handleAnuncioClick = (id) => {
        console.log(`Anúncio clicado com ID: ${id}`);
    };

    if (loading) {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <Loader size="lg" content="Carregando anúncios..."/>
            </div>
        );
    }

    if (error) {
        return <p>Erro ao carregar os anúncios: {error.message}</p>;
    }

    return (
        <>
            <h2 style={{paddingTop: "120px"}}>{tituloDaPagina}</h2>
            <Button appearance="primary" onClick={handleClick}>Criar anúncio</Button>
            <Divider>
                <h3>Anúncios postados</h3>
            </Divider>
            {data && Array.isArray(data) ? (
                <div style={{display: "flex", flexWrap: "wrap", gap: "20px"}}>
                    {data.map((anuncio) => (
                        <AnuncioCard
                            key={anuncio._id}
                            onEdit={() => handleEdit(anuncio._id)}
                            onDelete={() => handleDelete(anuncio._id)}
                            onClick={() => handleAnuncioClick(anuncio._id)}
                            imageUrl={anuncio.imageUrl || "https://cdn-icons-png.flaticon.com/128/3774/3774278.png"}
                            titulo={anuncio.titulo || "Descrição indisponível"}
                        />
                    ))}
                </div>
            ) : (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
                    <p>Você ainda não publicou nenhum anúncio.</p>
                    <Button appearance="primary" onClick={handleClick}>Criar seu primeiro anúncio</Button>
                </div>
            )}
        </>
    );
}

export default Perfil;
