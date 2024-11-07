import styles from "../assets/styles/ErrorMessage.module.css";

export default function ErrorMessage({ message }) {
    return (
        <div className={styles.container}>
            <div className={styles.subContainer}>
                <i className="fa-solid fa-exclamation"></i>
            </div>
            <p>{message}</p>
        </div>
    );
}
