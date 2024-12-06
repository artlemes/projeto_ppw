import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import MenuDropdownUsuario from "../MenuDropdownUsuario";

function Header() {
    return (
        <header className={styles.header}>
            <Link to="/">
                <img src="/images/logopgw.png" alt="Logo" />
            </Link>

            <div>
                <MenuDropdownUsuario/>
            </div>
        </header>
    );
}


export default Header;