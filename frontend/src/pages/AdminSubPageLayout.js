import styles from "../assets/styles/AdminSubPageLayout.module.css";

export default function AdminSubPageLayout({ handleReturn, children }) {
    return (
        <div className={styles.container}>
            <div onClick={handleReturn}>
                <i className="fa-solid fa-arrow-right"></i>
            </div>
            <div>{children}</div>
        </div>
    );
}
