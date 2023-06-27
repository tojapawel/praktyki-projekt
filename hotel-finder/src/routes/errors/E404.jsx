import { Link } from "react-router-dom";

import styles from "./E404.module.css";

function E404() {
    return (
        <div className={styles.error}>
            <header className={styles.error_header}>
                <p>error 404 - Strona która szukasz nie istnieje.</p>
                <Link to="/" className={styles.error_link}>Powrót do strony głównej</Link>
            </header>
        </div>
    );
}

export default E404;
