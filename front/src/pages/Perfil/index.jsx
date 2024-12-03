import Sider from "../../components/Sider/index.jsx"
import ProfileBackground from "../../components/Profile-background/index.jsx";
import styles from "./Perfil.module.css"


function Perfil() {
    return (
        <div className={styles.fundoPagina}>
        <Sider></Sider>
        <ProfileBackground></ProfileBackground>
        <Sider></Sider>
        </div>
    )

}

export default Perfil;