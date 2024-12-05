import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import BotaoPadraoPequeno from "../BotaoPadraoPequeno";


function Header({ botoesDireita }) {
    let listaDeBotoesDireita = [];

    botoesDireita.forEach((botao, index) => {
        listaDeBotoesDireita.push(
            <BotaoPadraoPequeno
                key={index}
                legenda={botao.legenda}
                link={botao.link}
                onClick={botao.onClick} 
            />
        );
    });

    return (
        <header className={styles.header}>
            <Link to="/">
                <img src="/images/logopgw.png" alt="Logo" />
            </Link>

            <div>
                {listaDeBotoesDireita}
            </div>
        </header>
    );
}


export default Header;