import AdminLayout from "./AdminLayout";
import styles from "../assets/styles/AdminDashboard.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminPosts from "./AdminPosts";
import AdminSkills from "./AdminSkills";
import AdminProjects from "./AdminProjects";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
    const { isAdmin } = useAuthContext();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAdmin) {
            navigate("/admin/login");
        } else {
            setIsLoading(false);
        }
    }, [isAdmin]);

    const [content, setContent] = useState("Posts");

    const handleClick = (content) => {
        setContent(content);
    };

    const renderContent = () => {
        switch (content) {
            case "Posts":
                return <AdminPosts></AdminPosts>;
            case "Technologies":
                return <AdminSkills></AdminSkills>;
            case "Projects":
                return <AdminProjects></AdminProjects>
        }
    };

    return (
        <AdminLayout>
            <div className={styles.container}>
                <div>
                    <div>
                        <Link
                            onClick={() => handleClick("Posts")}
                            className={
                                content === "Posts" ? styles.selected : ""
                            }
                        >
                            Posts
                        </Link>
                    </div>
                    <div>
                        <Link
                            onClick={() => handleClick("Technologies")}
                            className={
                                content === "Technologies"
                                    ? styles.selected
                                    : ""
                            }
                        >
                            Technologies
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
                </div>
                <div>{renderContent()}</div>
            </div>
        </AdminLayout>
    );
}
