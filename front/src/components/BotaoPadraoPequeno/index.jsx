import styles from "./BotaoPadraoPequeno.module.css"

function BotaoPadraoPequeno({ legenda, link }) {
    return (
        <>
        
        <button onClick={()=>{document.location.href=link}} className={styles.BotaoPadraoPequeno}>
            {legenda}
        </button>

        </>
    );
};

export default BotaoPadraoPequeno;