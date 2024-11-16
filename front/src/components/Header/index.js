import styles from "./Header.module.css"
import { Link } from "react-router-dom"


function Header() {
    return (
        <header className={styles.header}> {/* sempre usar className pra definir as classes pro css*/}

            {/* <img src="#" alt="Logo"></img> colocar a logo do sistema quando tiver */}

            <Link to="/">
                <span>
                    Inserir logo
                </span>
            </Link>

            <nav>
                <Link to="/login">Login</Link>
            </nav>




        </header>




    )




}


export default Header;