import React from "react";
import styles from './Footer.module.css';
import FooterMenu from "../FooterMenu/FooterMenu";

const Footer = () => (
    <footer className={styles.footer}>
        <p>&copy; TriPlanner - All Rights Reserved</p>
        <FooterMenu/>
    </footer>
);

export default Footer;