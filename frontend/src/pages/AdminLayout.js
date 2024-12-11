import styles from "../assets/styles/AdminLayout.module.css";
import GlobalMessage from "../compenents/GlobalMessage";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

export default function AdminLayout({ children }) {
    const { globalMessage } = useGlobalMessageContext();

    return (
        <>
            {globalMessage && <GlobalMessage></GlobalMessage>}
            <div className={styles.container}>{children}</div>
        </>
    );
}
