import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import BotaoPadrao from "../BotaoPadrao";


function Header({legenda, link}) {

    return (
        <header className={styles.header}> {/* sempre usar className pra definir as classes pro css*/}

            <Link to="/">
                <img src='/images/logopgw.png' alt="Logo"></img>
            </Link>

            <BotaoPadrao legenda={legenda} link={link}></BotaoPadrao>

        </header>

    )

}


export default Header;