import styles from "./Profile-background.module.css"
import ProfileSider from "../ProfileSider"

function ProfileBackground({tituloDaPagina}) {
    return (
        <>
            <ProfileSider></ProfileSider>
            <div className={styles.profile}>
                <h2 className={styles.profileTitle}>{tituloDaPagina}</h2>
                <button className={styles.botao}>Criar anúncio</button>
                <div className={styles.meuAnuncio}>
                    <img className={styles.imagemCateg} src='https://cdn-icons-png.flaticon.com/128/3774/3774278.png'></img>
                    <p className={styles.info}>Informações sobre o preço, descrição</p>
                    <div className={styles.botoesMeuAnuncio}>
                        <button className={styles.botao}>Editar anúncio</button>
                        <button className={styles.botaoExcluir}>Excluir anúncio</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfileBackground