import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import BotaoPadraoPequeno from "../BotaoPadraoPequeno";


function Header({legenda, link}) {

    return (
        <header className={styles.header}> {/* sempre usar className pra definir as classes pro css*/}

            <Link to="/">
                <img src='/images/logopgw.png' alt="Logo"></img>
            </Link>

            <BotaoPadraoPequeno legenda={legenda} link={link}></BotaoPadraoPequeno>

        </header>

    )

}


export default Header;