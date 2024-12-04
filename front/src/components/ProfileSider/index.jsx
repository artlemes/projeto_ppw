import styles from "./ProfileSider.module.css"
import BotaoPadraoPequeno from "../BotaoPadraoPequeno"

function ProfileSider() {
    return (
        <>
        <header className={styles.profileSider}>
            <img className={styles.profileImage} src="https://wallpapers.com/images/high/best-profile-pictures-x936iuuogvln5oxj.webp"></img>
            <p className={styles.nomeUsuario}>Nome do usuário</p>
            <buttom className={styles.botaoAnuncios}>Anúncios</buttom>
            <buttom className={styles.botaoEditarPerfil}>Editar perfil</buttom>
        </header>
        
        
        </>
    )
}

export default ProfileSider