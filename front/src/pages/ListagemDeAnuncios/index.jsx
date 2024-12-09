import React, { useEffect, useState } from "react";
import useSendData from "../../services/useSendData";
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import "./ListagemDeAnuncios.css"; // Importa o CSS da página
import Header from "../../components/Header/index.jsx";
import Footer from "../../components/Footer/index.jsx";

function ListagemDeAnuncios() {
    const [categoria, setCategoria] = useState(null);
    const { sendData, loading, error, data } = useSendData();
    const navigate = useNavigate(); // Inicializa o hook de navegação

    useEffect(() => {
        sendData("anuncio/buscar", null, "GET");
    }, [sendData]);

    const anuncios = data || [];

    const handleFilterChange = (event) => {
        setCategoria(event.target.value);
    };

    // Função para redirecionar para a página do anúncio
    const handleAnuncioClick = (anuncioId) => {
        navigate(`/anuncio/ver/${anuncioId}`); // Redireciona para a página do anúncio com o id
    };

    return (
        <div className="listagem-container">
            {/* Header */}
            <Header></Header>

            {/* Conteúdo principal */}
            <div className="titulo">
                <h3>Anúncios encontrados</h3>
                <p>Categoria tal, pode conter algum tipo de filtro aqui ou algo assim</p>
            </div>

            {/* Filtros */}
            <div className="filtros">
                <select
                    className="select-picker"
                    value={categoria || ""}
                    onChange={handleFilterChange}
                >
                    <option value="">Todas as categorias</option>
                    <option value="1">Categoria 1</option>
                    <option value="2">Categoria 2</option>
                </select>
                <input className="input-filtro" placeholder="Buscar anúncio" />
            </div>

            {/* Exibição de carregamento */}
            {loading && (
                <div className="loader-container">
                    <p>Carregando anúncios...</p>
                </div>
            )}

            {/* Exibição de erro */}
            {error && <p>Erro ao carregar os anúncios: {error.message}</p>}

            {/* Lista de anúncios */}
            {!loading && anuncios.length > 0 && (
                <div className="lista-anuncios">
                    {anuncios.map((anuncio) => (
                        <div
                            key={anuncio._id}
                            className="card-anuncio"
                            onClick={() => handleAnuncioClick(anuncio._id)} // Adicionando o evento de clique
                        >
                            <img
                                src={anuncio.imageUrl || "https://via.placeholder.com/150"}
                                alt={anuncio.titulo || "Título indisponível"}
                                className="anuncio-img"
                            />
                            <h4 className="anuncio-titulo">
                                {anuncio.titulo || "Título indisponível"}
                            </h4>
                            <p className="anuncio-descricao">
                                {anuncio.descricao || "Descrição indisponível"}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Caso não tenha anúncios */}
            {!loading && anuncios.length === 0 && (
                <div className="nenhum-anuncio">
                    <p>Não há anúncios disponíveis.</p>
                </div>
            )}

            {/* Footer */}
            <Footer></Footer>
        </div>
    );
}

export default ListagemDeAnuncios;
