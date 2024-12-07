import styles from "./Formulario.module.css"


function Formulario( {children} ) {

    return (
        <>
        <div className={styles.formulario}>
            {children}
        </div>
        </>
    )

}


export default Formulario;