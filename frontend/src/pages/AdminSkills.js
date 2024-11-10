import styles from "../assets/styles/AdminSkills.module.css";
import "../assets/styles/styles.css";
import { useState } from "react";
import LanguageCard from "../compenents/LanguageCard";
import GeneralSkillCard from "../compenents/GeneralSkillCard";
import AdminSubPageLayout from "./AdminSubPageLayout";
import LanguageCardV2 from "../compenents/LanguageCardV2";
import GeneralSkillCardV2 from "../compenents/GeneralSkillCardV2";
import ErrorMessage from "../compenents/ErrorMessage";

export default function AdminSkills() {
    const [content, setContent] = useState("home");

    const renderContent = () => {
        switch (content) {
            case "home":
                return <Home handleClick={setContent}></Home>;
            case "newLang":
                return <NewLanguage handleClick={setContent}></NewLanguage>;
            case "newTechnology":
                return <NewTechnology handleClick={setContent}></NewTechnology>;
        }
    };

    return renderContent();
}

function Home({ handleClick }) {
    return (
        <div className={`${styles.container} sub-admin-page-layout`}>
            <div>
                <h1>Technologies. (1)</h1>
                <div>
                    <button onClick={() => handleClick("newLang")}>
                        New Language
                    </button>
                    <button onClick={() => handleClick("newTechnology")}>
                        New Technology
                    </button>
                </div>
            </div>
            <div>
                <div>
                    <h3>Languages.</h3>
                    <div>
                        <LanguageCard></LanguageCard>
                        <LanguageCard></LanguageCard>
                        <LanguageCard></LanguageCard>
                    </div>
                </div>
                <div>
                    <h3>Other Technologies.</h3>
                    <div>
                        <GeneralSkillCard></GeneralSkillCard>
                        <GeneralSkillCard></GeneralSkillCard>
                        <GeneralSkillCard></GeneralSkillCard>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NewLanguage({ handleClick }) {
    const handleReturn = () => {
        handleClick("home");
    };
    return (
        <AdminSubPageLayout handleReturn={handleReturn}>
            <div className={styles.newLangContainer}>
                <LanguageCardV2></LanguageCardV2>
            </div>
        </AdminSubPageLayout>
    );
}

function NewTechnology({ handleClick }) {
    const [content, setContent] = useState("techology");

    const renderContent = () => {
        switch (content) {
            case "techology":
                return <GeneralSkillCardV2></GeneralSkillCardV2>;
            case "orm":
                return <NewOrmCard></NewOrmCard>;
            case "framework":
                return <NewFrameWorkCard></NewFrameWorkCard>;
        }
    };

    const handleReturn = () => {
        handleClick("home");
    };

    return (
        <AdminSubPageLayout handleReturn={handleReturn}>
            <div className={styles.newLangContainer}>
                <div>
                    <button
                        onClick={() => setContent("techology")}
                        className={
                            content == "techology" ? styles.selected : ""
                        }
                    >
                        New Technology
                    </button>
                    <button
                        onClick={() => setContent("orm")}
                        className={content == "orm" ? styles.selected : ""}
                    >
                        New ORM
                    </button>
                    <button
                        onClick={() => setContent("framework")}
                        className={
                            content == "framework" ? styles.selected : ""
                        }
                    >
                        New Framework
                    </button>
                </div>
                {renderContent()}
            </div>
        </AdminSubPageLayout>
    );
}

function NewOrmCard() {
    const [orm, setOrm] = useState("");
    const [err, setErr] = useState(null);

    const handleClick = () => {
        if (orm.trim() === "") {
            setErr("This field is required");
            return;
        }
    };

    return (
        <div className={styles.infoCard}>
            <input
                placeholder="ORM"
                onChange={(e) => setOrm(e.target.value)}
            ></input>
            {err && <ErrorMessage message={err}></ErrorMessage>}
            <button onClick={handleClick}>ADD</button>
        </div>
    );
}

function NewFrameWorkCard() {
    const [framework, setFramework] = useState("");
    const [err, setErr] = useState(null);

    const handleClick = () => {
        if (framework.trim() === "") {
            setErr("This field is required");
            return;
        }
    };

    return (
        <div className={styles.infoCard}>
            <input
                placeholder="Framework"
                onChange={(e) => setFramework(e.target.value)}
            ></input>
            {err && <ErrorMessage message={err}></ErrorMessage>}
            <button onClick={handleClick}>ADD</button>
        </div>
    );
}
