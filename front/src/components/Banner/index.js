import styles from "./Banner.module.css";

function Banner() {
    return (
        <div 
            
                className={styles.banner}
                style = {{backgroundImage:"url('/images/exemplo1.png')"}}

                /*style = {{backgroundImage:'url('/images/${img}.png')'}} caso queira fazer uma imagem dinamica coloca um parametro img na função*/





        ></div>


 
    );
}

export default Banner; 