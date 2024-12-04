import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import BotaoPadraoPequeno from "../BotaoPadraoPequeno";


function Header({botoes}) {

    let listaDeBotoes = []

    botoes.forEach((botao) => {
        listaDeBotoes.push(<BotaoPadraoPequeno legenda={botao.legenda} link={botao.link}></BotaoPadraoPequeno>)
    })

    return (
        <header className={styles.header}> {/* sempre usar className pra definir as classes pro css*/}

            <Link to="/">
                <img src='/images/logopgw.png' alt="Logo"></img>
            </Link>
            
            <div>{listaDeBotoes}</div>
            
        </header>

    )

}


export default Header;