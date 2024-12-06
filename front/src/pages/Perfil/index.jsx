import React, {useEffect} from "react";
import {Button, Divider, Loader} from "rsuite";
import AnuncioButton from "../../components/AnuncioButton";
import useSendData from "../../services/useSendData";

function Perfil({ tituloDaPagina }) {
    const { sendData, loading, error, data } = useSendData();

    useEffect(() => {
        // Faz a requisição GET quando o componente é montado
        sendData("anuncio/buscar", null, "GET");
    }, [sendData]);

    const handleEdit = () => {
        console.log("Editar anúncio");
    };

    const handleDelete = () => {
        console.log("Excluir anúncio");
    };

    const handleAnuncioClick = () => {
        console.log("Anúncio clicado");
    };

    if (loading) {
        // Mostra o Loader enquanto os dados estão carregando
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <Loader size="lg" content="Carregando anúncios..." />
            </div>
        );
    }

    if (error) {
        return <p>Erro ao carregar os anúncios: {error.message}</p>;
    }

    return (
        <>
            <h2 style={{ paddingTop: "120px" }}>{tituloDaPagina}</h2>
            <Button appearance="primary">Criar anúncio</Button>
            <Divider>
                <h3>Anúncios postados</h3>
            </Divider>
            {data && Array.isArray(data) ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                    {data.map((anuncio) => (
                        <AnuncioButton
                            key={anuncio.id}
                            nome={anuncio.nome}
                            preco={anuncio.preco}
                            descricao={anuncio.descricao}
                            imagem={anuncio.imagem}
                        />
                    ))}
                </div>
            ) : (
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", gap: "20px"}}>
                    <p>Você ainda não publicou nenhum anúncio.</p>
                    <Button appearance="primary">Criar seu primeiro anúncio</Button>
                </div>
            )}
        </>
    );
}

export default Perfil;
