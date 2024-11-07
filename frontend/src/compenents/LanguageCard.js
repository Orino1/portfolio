import styles from "../assets/styles/SkillCard.module.css";

export default function LanguageCard() {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.cardHeader}>
                    <h2>
                        <i className="fa-brands fa-python"></i> Python
                    </h2>
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.skillCategory}>
                        <h3>Frameworks</h3>
                        <p>Flask, Django</p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>ORMS</h3>
                        <p>SQLAlchemy</p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>Libraries</h3>
                        <p>Flask Ecosystem</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
