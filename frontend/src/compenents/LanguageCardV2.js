import styles from "../assets/styles/LanguageCardV2.module.css";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

export default function LanguageCardV2() {
    const [err, setErr] = useState(null);

    const [language, setLanguage] = useState(null);
    const [langDropDownOpen, setLangDropDownOpen] = useState(false);

    const [frameworks, setFrameworks] = useState([]);
    const [framDropDownOpen, setFramDropDownOpen] = useState(false);

    const [orms, setOrms] = useState([]);
    const [ormDropDownOpen, setOrmDropDownOpen] = useState(false);

    const [libs, setLibs] = useState([]);
    const [libsDropDownOpen, setLibsDropDownOpen] = useState(false);

    const handleClick = () => {
        if (!language) {
            setErr("Select a language !");
        }
    };

    return (
        <div className={styles.container}>
            <div>
                <div
                    className={styles.cardHeader}
                    onClick={() => setLangDropDownOpen((prev) => !prev)}
                    onMouseLeave={() => setLangDropDownOpen(false)}
                >
                    <h2>
                        <i class="fa-solid fa-code"></i> SELECT
                    </h2>
                    {err && <ErrorMessage message={err}></ErrorMessage>}
                    {langDropDownOpen && (
                        <div className={styles.DropDown}>
                            <h2 className={styles.element}>PYTHON</h2>
                            <h2 className={styles.element}>JAVASCRIPT</h2>
                            <h2 className={styles.element}>PHP</h2>
                        </div>
                    )}
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.skillCategory}>
                        <h3>Frameworks</h3>
                        <p
                            onClick={() => setFramDropDownOpen((prev) => !prev)}
                            onMouseLeave={() => setFramDropDownOpen(false)}
                        >
                            N/A
                            {framDropDownOpen && (
                                <div className={styles.DropDown}>
                                    <p className={styles.element}>hey</p>
                                    <p className={styles.element}>hey</p>
                                    <p className={styles.element}>hey</p>
                                </div>
                            )}
                        </p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>ORMS</h3>
                        <p
                            onClick={() => setOrmDropDownOpen((prev) => !prev)}
                            onMouseLeave={() => setOrmDropDownOpen(false)}
                        >
                            N/A
                            {ormDropDownOpen && (
                                <div className={styles.DropDown}>
                                    <p className={styles.element}>hey</p>
                                    <p className={styles.element}>hey</p>
                                    <p className={styles.element}>hey</p>
                                </div>
                            )}
                        </p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>Libraries</h3>
                        <p
                            onClick={() => setLibsDropDownOpen((prev) => !prev)}
                            onMouseLeave={() => setLibsDropDownOpen(false)}
                        >
                            N/A
                            {libsDropDownOpen && (
                                <div className={styles.DropDown}>
                                    <p className={styles.element}>hey</p>
                                    <p className={styles.element}>hey</p>
                                    <p className={styles.element}>hey</p>
                                </div>
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <button onClick={handleClick}>ADD</button>
        </div>
    );
}
