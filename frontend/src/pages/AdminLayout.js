import styles from "../assets/styles/AdminLayout.module.css";
import NavBar from "../compenents/Header";
import GlobalMessage from "../compenents/GlobalMessage";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

export default function AdminLayout({ children }) {
    const { gobalMessage } = useGlobalMessageContext();

    return (
        <>
            {gobalMessage && <GlobalMessage></GlobalMessage>}
            <NavBar></NavBar>
            <div className={styles.container}>{children}</div>
        </>
    );
}
