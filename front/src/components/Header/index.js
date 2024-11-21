import styles from "./Header.module.css"
import { Link } from "react-router-dom"


function Header() {
    return (
        <header className={styles.header}> {/* sempre usar className pra definir as classes pro css*/}

            <Link to="/">
                <img src='/images/logopgw.png' alt="Logo"></img>
            </Link>

            <nav>
                <Link to="/login">Login</Link>
            </nav>

        </header>

    )

}


export default Header;