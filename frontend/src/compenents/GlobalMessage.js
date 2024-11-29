import styles from "../assets/styles/GlobalMessage.module.css";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

export default function GlobalMessage() {
    const { globalMessage } = useGlobalMessageContext();

    return (
        <div className={`${styles.msg} ${globalMessage.type}`}>
            {globalMessage.msg}
        </div>
    );
}
