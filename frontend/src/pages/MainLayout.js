import NavBar from "../compenents/Header";
import Footer from "../compenents/Footer";
import styles from "../assets/styles/MainLayout.module.css";
import BottomNavigation from "../compenents/BottomNavigation";


export default function MainLayout({ children }) {
    return (
        <>
            <NavBar></NavBar>
            <div className={styles.main}>{children}</div>
            <BottomNavigation></BottomNavigation>
            <Footer></Footer>
        </>
    );
}
