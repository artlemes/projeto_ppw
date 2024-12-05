import styles from "./AnuncioBackGround.module.css"

function AnuncioBackGround({tituloDoAnuncio, descricaoAnuncio, imagensDoAnuncio}) {

    //criei essas variaveis para se adaptar a cada anuncio
    //eu imagino que imagensDoAnuncio seria uma lista com as imagens que o usuario cadastrou

    return (
        <>
            <div className={styles.anuncio}>

                <h2 className={styles.anuncioTitle}> Titulo do anuncio </h2>

                <div className={styles.dadosAnuncio}>

                    <div className={styles.descricao}>
                        <h3>Descrição</h3>
                        <p> Este carro é um modelo compacto, perfeito para quem busca economia e praticidade no dia a dia. 
                            Com motor 1.6, ele oferece um bom desempenho tanto em cidade quanto em viagens curtas. 
                            O design moderno, com linhas suaves e rodas de aro 16, destaca-se pelo acabamento em tom metálico prata, dando um toque sofisticado ao veículo. 
                            O interior é confortável, com bancos em tecido de alta durabilidade e painel de instrumentos digital.
                            Possui ar-condicionado, direção hidráulica, sistema de som com Bluetooth, vidros elétricos e rodas de liga leve. 
                            O carro tem baixa quilometragem e foi bem cuidado, sempre revisado em concessionária autorizada. Ideal para quem procura um carro de entrada com bom custo-benefício. </p>
                    </div>

                    <div className={styles.imagensAnuncio}>
                    <img src='https://cdn-icons-png.flaticon.com/128/3774/3774278.png'></img>
                    </div>
      
                </div>
            </div>
        </>
    )
}

export default AnuncioBackGround