import styles from "./Header.module.css"


function Header() {
    return (
        <header className={styles.header}> {/* sempre usar className pra definir as classes pro css*/}

            {/* <img src="#" alt="Logo"></img> colocar a logo do sistema quando tiver */}

            <span>
                Inserir logo
            </span>

            <nav>
                <a href="#">Login</a>
            </nav>




        </header>




    )




}


export default Header;