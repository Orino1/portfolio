import styles from "../assets/styles/SkillCard.module.css";
import { deleteTech } from "../apiService";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

export default function GeneralSkillCardV3({
    skill,
    handleTechDelete,
    setTechToBeEdited,
}) {
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleDelete = async () => {
        const success = await deleteTech(skill.id, setGlobalMessage);

        if (success) {
            handleTechDelete(skill.id);
        }
    };

    return (
        <div className={styles.container}>
            <i onClick={handleDelete} className="fa-solid fa-trash"></i>
                    <i
                        onClick={() => setTechToBeEdited(skill)}
                        className="fa-regular fa-pen-to-square"
                    ></i>
             <h2>
                <i className="fa-solid fa-server"></i> {skill.name}
            </h2>
            <hr></hr>
            {skill.section.map((section) => (
                <div className={styles.section}>
                    <h3>{section.header}</h3>
                    <p>{section.content}</p>
                </div>
            ))}
        </div>
    );
}
