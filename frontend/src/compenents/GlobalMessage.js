import styles from "../assets/styles/GlobalMessage.module.css";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

export default function GlobalMessage() {
    const { globalMessage } = useGlobalMessageContext();

    const messageClass = globalMessage.type === 'error' ? styles.error : styles.success;

    return (
        <div className={`${styles.msg} ${messageClass}`}>
            {globalMessage.msg}
        </div>
    );
}
