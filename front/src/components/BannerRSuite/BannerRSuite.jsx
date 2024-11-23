import React from 'react';
import { Panel } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import styles from "../Banner/Banner.module.css";

const BannerRSuite = () => {

    return (
        <Panel className={styles.banner}
            style={{backgroundImage: "url('/images/banner.png')"}}
            ></Panel>
    );
};

export default BannerRSuite;