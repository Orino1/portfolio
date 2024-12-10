import styles from "../assets/styles/SkillCard.module.css";

export default function GeneralSkillCard({ skill }) {
    return (
        <div className={styles.container}>
            <h2>
                <i className="fa-solid fa-server"></i> {skill.name}
            </h2>
            <hr></hr>
            {skill.section.map((section) => (
                <div className={styles.section}>
                    <h3>{section.header}</h3>
                    <p>{section.content}</p>
                </div>
            ))}
        </div>
    );
}
