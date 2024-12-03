import Sider from "../../components/Sider/index.jsx"
import ProfileBackground from "../../components/Profile-background/index.jsx";
import styles from "./Perfil.module.css"
import Header from "../../components/Header"

function Perfil() {
    return (
        <div className={styles.fundoPagina}>
        <Header botoes={[{"link":"../","legenda":"Sair"},{"link":"../","legenda":"Sair"}]}></Header>
        <Sider></Sider>
        <ProfileBackground></ProfileBackground>
        <Sider></Sider>
        </div>
    )

}

export default Perfil;