import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>© {new Date().getFullYear()} News. All rights reserved.</div>
            <div className={styles.links}>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </div>
        </footer>
    );
}
