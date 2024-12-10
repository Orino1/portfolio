import styles from "../assets/styles/Portfolio.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import { deletProject } from "../apiService";

export default function ProjectCardV2({ project, setProjects }) {
    const [selectedStack, setSelectedStack] = useState(project.variants[0]);
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleStackSelection = (variant) => {
        setSelectedStack(variant);
    };

    const handleDeleteBtn = async () => {
        const success = await deletProject(project.id, setGlobalMessage);
        if (success) {
            setProjects((prev) => prev.filter((pro) => pro.id !== project.id));
        }
    };

    // we need to handle the update btn

    return (
        <div className={styles.project}>
            <i className="fa-solid fa-trash" onClick={handleDeleteBtn}></i>
            <i className="fa-regular fa-pen-to-square"></i>
            <h2>{project.name}</h2>
            <h3>{project.description}</h3>
            <p>
                The problem we're solving: {project.problem_statement}
            </p>
            <p>The solution offered by this project: {project.solution}</p>
            <hr></hr>
            <div className={styles.variants}>
                <div>
                    {project.variants.map((vr) => (
                        <span
                            className={
                                vr === selectedStack ? styles.selected : ""
                            }
                            onClick={() => handleStackSelection(vr)}
                            key={vr.id}
                        >
                            {vr.languages.map((lang) => lang.name).join(", ")}
                        </span>
                    ))}
                </div>
                <div>
                    <p>Stack details:</p>
                    <div>
                        {selectedStack.languages.map((lang) => (
                            <>
                                <span>{lang.name}</span>
                                {lang.orms.map((orm) => (
                                    <span>{orm.name}</span>
                                ))}
                                {lang.frameworks.map((fr) => (
                                    <span>{fr.name}</span>
                                ))}
                                {lang.libs.map((lib) => (
                                    <span>{lib.name}</span>
                                ))}
                            </>
                        ))}
                        {selectedStack.technologies.map((tech) => (
                            <span>{tech}</span>
                        ))}
                    </div>
                    <p>
                        Github:{" "}
                        <a target="_blank" href={selectedStack.github}>
                            {selectedStack.github}
                        </a>
                    </p>
                    <p>
                        Deployed at:{" "}
                        <a target="_blank" href={selectedStack.link}>
                            {selectedStack.link}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
