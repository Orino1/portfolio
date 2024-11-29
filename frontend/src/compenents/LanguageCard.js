import styles from "../assets/styles/SkillCard.module.css";

export default function LanguageCard({language}) {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.cardHeader}>
                    <h2>
                        <i class="fa-solid fa-code"></i> {language.language}
                    </h2>
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.skillCategory}>
                        <h3>Frameworks</h3>
                        <p>{language.frameworks.length === 0 ? 'N/A' : language.frameworks.map(orm => orm.name).join(', ')}</p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>ORMS</h3>
                        <p>{language.orms.length === 0 ? 'N/A' : language.orms.map(orm => orm.name).join(', ')}</p>
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
