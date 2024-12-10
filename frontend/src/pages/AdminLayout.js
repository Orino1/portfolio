import styles from "../assets/styles/AdminLayout.module.css";
import NavBar from "../compenents/Header";
import GlobalMessage from "../compenents/GlobalMessage";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

export default function AdminLayout({ children }) {
    const { globalMessage } = useGlobalMessageContext();

    return (
        <>
            {globalMessage && <GlobalMessage></GlobalMessage>}
            <NavBar></NavBar>
            <div className={styles.container}>{children}</div>
        </>
    );
}
