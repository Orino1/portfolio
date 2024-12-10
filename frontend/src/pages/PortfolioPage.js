import styles from "../assets/styles/Portfolio.module.css";
import "../assets/styles/styles.css";
import MainLayout from "./MainLayout";
import ProjectCardV1 from "../compenents/ProjectCardV1";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import { fetchAllProjects } from "../apiService";
import { useState, useEffect } from "react";

export default function PortfolioPage() {
    const { setGlobalMessage } = useGlobalMessageContext();
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getAllProducts = async () => {
            const data = await fetchAllProjects();

            if (data) {
                setProjects(data.projects);
                console.log(data.projects);
            }
        };

        getAllProducts();
    }, []);

    return (
        <MainLayout>
            <div className={`${styles.main} maxMainContainer`}>
                <div className="maxSubContainer">
                    <h1 className={styles.header}>Porftolio</h1>
                    <div className={styles.projectsContainer}>
                        {projects.map((project) => (
                            <ProjectCardV1
                                key={project.id}
                                project={project}
                            ></ProjectCardV1>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
