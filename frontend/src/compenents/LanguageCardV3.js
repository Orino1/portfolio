import styles from "../assets/styles/LanguageCard.module.css";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import { deleteLanguege } from "../apiService";

export default function LanguageCardV3({
    language,
    handleLangDelete,
    handleLangUpdate,
}) {
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleDelete = async () => {
        const success = await deleteLanguege(language.id, setGlobalMessage);

        if (success) {
            handleLangDelete(language.id);
        }
    };

    return (
        <div className={styles.container}>
            <i onClick={handleDelete} className="fa-solid fa-trash"></i>
            <i
                onClick={() => handleLangUpdate(language)}
                className="fa-regular fa-pen-to-square"
            ></i>

            <h2>
                <i class="fa-solid fa-code"></i> {language.language}
            </h2>

            <hr></hr>
            <div className={styles.subContainer}>
                <h3>Frameworks:</h3>
                <div className={styles.elements}>
                    {language.frameworks.length === 0 ? (
                        <span>N/A</span>
                    ) : (
                        language.frameworks.map((fr) => <span>{fr.name}</span>)
                    )}
                </div>
            </div>
            <div className={styles.subContainer}>
                <h3>Orms:</h3>
                <div className={styles.elements}>
                    {language.orms.length === 0 ? (
                        <span>N/A</span>
                    ) : (
                        language.orms.map((orm) => <span>{orm.name}</span>)
                    )}
                </div>
            </div>
            <div className={styles.subContainer}>
                <h3>Libraries:</h3>
                <div className={styles.elements}>
                    {language.libraries.length === 0 ? (
                        <span>N/A</span>
                    ) : (
                        language.libraries.map((lib) => <span>{lib.name}</span>)
                    )}
                </div>
            </div>
        </div>
    );
}
