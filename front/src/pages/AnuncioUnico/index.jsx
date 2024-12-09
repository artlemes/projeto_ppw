import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Sider from "../../components/Sider";
import Footer from "../../components/Footer";
import styles from "./AnuncioUnico.module.css";

function AnuncioUnico() {
    const [anuncio, setAnuncio] = useState(null);
    const [usuarioCriador, setUsuario] = useState(null);
    const { id } = useParams();  // Pega o ID do anúncio da URL
    const navigate = useNavigate();

    // Função para realizar o logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove o token
        navigate("/login"); // Redireciona para a página de login
    };

    useEffect(() => {
        // Função para buscar os detalhes do anúncio
        const fetchAnuncio = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("https://bk-ti1x.onrender.com/anuncio/buscar", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Erro HTTP: ${response.status}`);
                }

                const data = await response.json();

                // Agora, iterando sobre os dados corretamente:
                const anuncioEncontrado = data.find((anuncio) => anuncio._id === id);
                if (anuncioEncontrado) {
                    let userId = anuncioEncontrado.usuario_id
                    console.log('user id pelo anuncio')
                    console.log(userId)

                    const responseUsers = await fetch("https://bk-ti1x.onrender.com/usuario/buscar", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });

                    const dataUsers = await responseUsers.json();
                    console.log('todos usuarios')
                    console.log(dataUsers)

                    for (let user of dataUsers) {
                        console.log(user)
                        if (user._id === userId) {
                            console.log(user)
                            setUsuario(user)
                        }
                    }

                    setAnuncio(anuncioEncontrado);  // Atualiza o estado com o anúncio encontrado
                } else {
                    console.log("Anúncio não encontrado.");
                }
    
            } catch (error) {
                console.error("Erro ao carregar o anúncio:", error);
            }
        };

        fetchAnuncio();
    }, [id]);  // Recarrega a informação quando o ID mudar

    if (!anuncio) {
        return <div>Carregando anúncio...</div>;
    }

    return (
        <>
            <Header 
                botoesDireita={[{ 
                    link: "#", 
                    legenda: "Sair", 
                    onClick: handleLogout 
                }]}/>
            
            <div style={{display: "Flex"}}>
                <Sider />
                <div className={styles.anuncio}>
                    <h2 className={styles.anuncioTitle}>{anuncio.titulo || "Título do anúncio"}</h2>
                    <div className={styles.dadosAnuncio}>
                        <div className={styles.descricao}>
                            <h3>Descrição</h3>
                            <p>{anuncio.descricao || "Descrição indisponível"}</p>
                            <p>Preço: R${anuncio.preco || "Preço indisponivel"}</p>
                        </div>

                        <div className={styles.imagensAnuncio}>
                            <img 
                                src={anuncio.imageUrl || "https://via.placeholder.com/150"} 
                                alt={anuncio.titulo || "Imagem do anúncio"} 
                            />
                            <p>Criador: {usuarioCriador.nome}</p>
                            <p>Email: {usuarioCriador.email}</p>
                            <p>Telefone: {usuarioCriador.telefone}</p>
                        </div>
                    </div>
                </div>
                <Sider />
            </div>
            <Footer />
        </>
    );
}

export default AnuncioUnico;
