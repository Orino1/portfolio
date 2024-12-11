import styles from "../assets/styles/AdminAccount.module.css";
import { useState } from "react";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import { changePassword } from "../apiService";

export default function AdminAccount() {
    const [password, setPassword] = useState("");
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password.trim() === "") {
            setGlobalMessage({
                msg: "password cannot be empty.",
                type: "eroor",
            });
            return;
        }

        const newPassword = {
            password: password
        }

        const success = await changePassword(newPassword, setGlobalMessage);

        if (success) {
            setPassword("");
        }
    };

    return (
        <div className={styles.main}>
            <h1>Acount information</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="new password"
                    type="password"
                ></input>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}
