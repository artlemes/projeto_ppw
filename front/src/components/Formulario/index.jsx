import styles from "./Formulario.module.css"


function Formulario( {children} ) {

    return (
        <section className={styles.formulario}>
            {children}
        </section>
    )

}


export default Formulario;