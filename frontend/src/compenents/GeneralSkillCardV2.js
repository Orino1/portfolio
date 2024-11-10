import styles from "../assets/styles/GeneralSkillCardV2.module.css";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";

export default function GeneralSkillCardV2() {
    const [header, setHeader] = useState("");

    const [inputSections, setInputSections] = useState([
        { header: "", desc: "" },
    ]);

    const [err, setErr] = useState(null);

    const handleChange = (index, field, value) => {
        const updatedInputes = [...inputSections];
        updatedInputes[index][field] = value;
        setInputSections(updatedInputes);
    };

    const addNewSection = () => {
        setInputSections([...inputSections, { header: "", description: "" }]);
    };

    const submitSkill = () => {
        inputSections.forEach((section) => {
            if (header.trim() === "") {
                setErr("all fields are required.");
                return;
            }

            if (section.header.trim() === "" || section.desc.trim() === "") {
                setErr("all fields are required.");
                return;
            }
        });
        console.log(inputSections);
    };

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.cardHeader}>
                    <h2>
                        <i className="fa-solid fa-server"></i>
                        <input
                            onChange={(e) => setHeader(e.target.value)}
                            placeholder="Tool name"
                        ></input>
                    </h2>
                </div>
                <div className={styles.cardContent}>
                    {inputSections.map((inp, index) => (
                        <div className={styles.skillCategory} key={index}>
                            <input
                                placeholder="Header"
                                onChange={(e) =>
                                    handleChange(
                                        index,
                                        "header",
                                        e.target.value
                                    )
                                }
                            ></input>
                            <input
                                placeholder="Description"
                                onChange={(e) =>
                                    handleChange(index, "desc", e.target.value)
                                }
                            ></input>
                        </div>
                    ))}
                    <div className={styles.newSection}>
                        <button onClick={addNewSection}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    {err && <ErrorMessage message={err}></ErrorMessage>}
                </div>
            </div>
            <button onClick={submitSkill}>ADD</button>
        </div>
    );
}
