import styles from "../assets/styles/404.module.css"
import MainLayout from "./MainLayout"
import { Link } from "react-router-dom"

export default function NotFound() {
  return (
    <MainLayout>
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>Page you are looking for not found</h1>
                <Link to={"/"}>Home</Link>
            </div>
        </div>
    </MainLayout>
  )
}
