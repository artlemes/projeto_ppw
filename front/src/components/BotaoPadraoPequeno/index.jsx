import styles from "./BotaoPadraoPequeno.module.css"
import { Link } from "react-router-dom";

function BotaoPadraoPequeno({ legenda, link, onClick }) {
    return (
        <button
            className={styles.botao}
            onClick={onClick} // Chama a função onClick se fornecida
        >
            {link ? <Link to={link}>{legenda}</Link> : legenda}
        </button>
    );
}

export default BotaoPadraoPequeno;