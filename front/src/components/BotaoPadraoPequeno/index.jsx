import styles from "./BotaoPadraoPequeno.module.css"

function BotaoPadraoPequeno({ legenda, link }) {
    return (
        <>
        <header className={styles.header}></header>
        <a href={link} style={styles.link}>

            <button className={styles.BotaoPadraoPequeno}>{legenda}</button>

        </a>
        </>
    );
};

export default BotaoPadraoPequeno;