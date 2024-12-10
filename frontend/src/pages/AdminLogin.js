import AdminLayout from "./AdminLayout";
import styles from "../assets/styles/AdminLoginPage.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import { login } from "../apiService";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
    const [success, setSuccess] = useState(false);
    const [username, setUsernmae] = useState("");
    const [password, setPassword] = useState("");
    const { isAdmin, setIsAdmin } = useAuthContext();
    const { setGlobalMessage } = useGlobalMessageContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAdmin) {
            navigate("/admin/");
        }
    }, [isAdmin]);

    const handleClick = async (e) => {
        e.preventDefault();

        const loggedin = await login(
            { username: username, password: password },
            setGlobalMessage
        );

        if (loggedin) {
            setSuccess(true)
            setTimeout(() => {
                setIsAdmin(true);
            }, 600);
        }
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
                        <input
                            onChange={(e) => setUsernmae(e.target.value)}
                            placeholder="username"
                            type="text"
                        ></input>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            type="password"
                        ></input>
                    </div>
                    <button className={success && styles.success}>Login</button>
                </form>
            </div>
        </AdminLayout>
    );
}
