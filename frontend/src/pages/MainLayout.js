import NavBar from "../compenents/Header";
import Footer from "../compenents/Footer";
import styles from "../assets/styles/MainLayout.module.css";
import BottomNavigation from "../compenents/BottomNavigation";
import GlobalMessage from "../compenents/GlobalMessage";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

export default function MainLayout({ children }) {
    const { gobalMessage } = useGlobalMessageContext();

    return (
        <>
            {gobalMessage && <GlobalMessage></GlobalMessage>}
            <NavBar></NavBar>
            <div className={styles.main}>{children}</div>
            <BottomNavigation></BottomNavigation>
            <Footer></Footer>
        </>
    );
}
