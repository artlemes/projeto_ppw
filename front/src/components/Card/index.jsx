import styles from "./Card.module.css"
import {Button, Panel} from "rsuite";
import 'rsuite/dist/rsuite.min.css';

function Card() {
    return(
        /*
            Usando componentes do rsuite para facilitar a homogeneidade do visual do site.
            O código original, caso queiram voltar para o antigo, está comentado abaixo
        */
        <Panel className={styles.card}>
            <Button className={styles.buttonCard}>
                <img src="/images/exemplo2.png"></img>
            </Button>
        </Panel>
        /*<section className={styles.card}>
            <a href="#">
                <img src="/images/exemplo2.png"></img>
            </a>
        </section>*/
    );
}

export default Card