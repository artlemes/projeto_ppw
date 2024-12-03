import styles from "./BotaoPadrao.module.css"

function BotaoPadrao({ legenda, link }) {
    return (
        <>
        <header className={styles.header}></header>
        <a href={link} style={styles.link}>

            <button style={styles.button}>{legenda}</button>

        </a>
        </>
    );
};

export default BotaoPadrao;