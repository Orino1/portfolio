import styles from "../assets/styles/AdminLayout.module.css";
import NavBar from "../compenents/Header";
import Footer from "../compenents/Footer";

export default function AdminLayout({children}) {
    return (
        <>
            <NavBar></NavBar>
            <div className={styles.container}>
                {children}
            </div>
        </>
    );
}
