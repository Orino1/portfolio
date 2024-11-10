import AdminLayout from "./AdminLayout";
import styles from "../assets/styles/AdminLoginPage.module.css";
import { useState } from "react";
//

export default function AdminLogin() {
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setSuccess(true);
    };

    return (
        <AdminLayout>
            <div className={`${styles.container} ${success && styles.success}`}>
                <form
                    className={success && styles.success}
                    onSubmit={(e) => handleClick(e)}
                >
                    <h3>Welcom back</h3>
                    <div>
                        <input placeholder="username" type="text"></input>
                        <input placeholder="password" type="password"></input>
                    </div>
                    <button className={success && styles.success}>Login</button>
                </form>
            </div>
        </AdminLayout>
    );
}
