import styles from "../assets/styles/SkillCard.module.css";

export default function GeneralSkillCard() {
    return (
        <div className={styles.container}>
            <div>
                <div className={styles.cardHeader}>
                    <h2>
                        <i className="fa-solid fa-server"></i> Nginx
                    </h2>
                </div>
                <div className={styles.cardContent}>
                    <div className={styles.skillCategory}>
                        <h3>Features & Capabilities</h3>
                        <p>Stored Procedures, Triggers, Transactions, Indexing</p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>Tools</h3>
                        <p>MySQL Workbench, phpMyAdmin</p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>Query Proficiency</h3>
                        <p>Complex Joins, Subqueries, Query Optimization</p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>Data Management</h3>
                        <p>Schema Design, Backup/Restore, Data Migration</p>
                    </div>
                    <div className={styles.skillCategory}>
                        <h3>Other Databases</h3>
                        <p>PostgreSQL, MongoDB, SQLite</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
