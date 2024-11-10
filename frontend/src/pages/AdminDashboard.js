import AdminLayout from "./AdminLayout";
import styles from "../assets/styles/AdminDashboard.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import AdminPosts from "./AdminPosts";
import AdminSkills from "./AdminSkills";

export default function AdminDashboard() {
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
