import AdminLayout from "./AdminLayout";
import styles from "../assets/styles/AdminDashboard.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSkills from "./AdminSkills";
import AdminProjects from "./AdminProjects";
import AdminAccount from "./AdminAccount";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const { isAdmin } = useAuthContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const name = process.env.REACT_APP_NAME

    useEffect(() => {
        if (!isAdmin) {
            navigate("/admin/login");
        } else {
            setIsLoading(false);
        }
    }, [isAdmin]);

    const [content, setContent] = useState("Skills");

    const handleClick = (content) => {
        setSidebarOpen(false);
        setContent(content);
    };

    const handleExpandBtnClick = () => {
        setSidebarOpen(prev => !prev);
    }

    const renderContent = () => {
        switch (content) {
            case "Skills":
                return <AdminSkills/>;
            case "Projects":
                return <AdminProjects/>;
            case "Account":
                return <AdminAccount/>;
        }
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div className={sidebarOpen && styles.open}>
                <Link to="/" className={styles.logo}>{name}</Link>
                    <div>
                        <Link
                            onClick={() => handleClick("Skills")}
                            className={
                                content === "Skills"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            Skills
                        </Link>
                    </div>
                    <div>
                        <Link
                            onClick={() => handleClick("Projects")}
                            className={
                                content === "Projects" ? styles.selected : ""
                            }
                        >
                            Projects
                        </Link>
                    </div>
                    <div>
                        <Link
                            onClick={() => handleClick("Account")}
                            className={
                                content === "Account" ? styles.selected : ""
                            }
                        >
                            Account
                        </Link>
                    </div>
                    <button onClick={handleExpandBtnClick}>></button>
                </div>
                <div>{renderContent()}</div>
            </div>
        </AdminLayout>
    );
}
