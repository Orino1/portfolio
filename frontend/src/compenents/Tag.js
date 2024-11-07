import styles from "../assets/styles/PostCard.module.css";

export default function Tag({tag}) {
    return (
        <div className={styles.tag}>{tag}</div>
    )
}
