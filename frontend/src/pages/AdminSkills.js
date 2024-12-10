import styles from "../assets/styles/AdminSkills.module.css";
import "../assets/styles/styles.css";
import { useState, useEffect } from "react";
import AdminSubPageLayout from "./AdminSubPageLayout";
import GeneralSkillCardV3 from "../compenents/GeneralSkillCardV3";
import LanguageCardV3 from "../compenents/LanguageCardV3";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import {
    getSkills,
    createLanguege,
    createTech,
    updateLanguege,
    updateTech,
} from "../apiService";

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
    const [languages, setLanguages] = useState(null);
    const [technologies, setTechnologies] = useState(null);
    const { setGlobalMessage } = useGlobalMessageContext();
    const [langToBeEdited, setLangToBeEdited] = useState(null);
    const [techToBeEdited, setTechToBeEdited] = useState(null);

    const handleLangDelete = (lang_id) => {
        setLanguages((prev) => prev.filter((lang) => lang.id !== lang_id));
    };

    const handleTechDelete = (tech_id) => {
        setTechnologies((prev) => prev.filter((tech) => tech.id !== tech_id));
    };

    useEffect(() => {
        const fetchSkils = async () => {
            const data = await getSkills(setGlobalMessage);

            if (data) {
                setLanguages(data.languages);
                setTechnologies(data.technologies);
            }
        };

        fetchSkils();
    }, []);

    return langToBeEdited ? (
        <UpdateLanguage
            setLangToBeUpdated={setLangToBeEdited}
            language={langToBeEdited}
        />
    ) : techToBeEdited ? (
        <UpdateTechnology
            technology={techToBeEdited}
            setTechToBeEdited={setTechToBeEdited}
        />
    ) : (
        <div className={`${styles.container} sub-admin-page-layout`}>
            <div>
                <h1></h1>
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
                    <h3>Languages. {languages && `(${languages.length})`}</h3>
                    <div>
                        {languages &&
                            languages.map((lang) => (
                                <LanguageCardV3
                                    handleLangUpdate={setLangToBeEdited}
                                    handleLangDelete={handleLangDelete}
                                    language={lang}
                                ></LanguageCardV3>
                            ))}
                    </div>
                </div>
                <div>
                    <h3>
                        Technologies.{" "}
                        {technologies && `(${technologies.length})`}
                    </h3>
                    <div>
                        {technologies &&
                            technologies.map((tech) => (
                                <GeneralSkillCardV3
                                    setTechToBeEdited={setTechToBeEdited}
                                    handleTechDelete={handleTechDelete}
                                    skill={tech}
                                ></GeneralSkillCardV3>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function NewLanguage({ handleClick }) {
    const [langName, setLangeName] = useState(null);
    const [orms, setOrms] = useState([]);
    const [frameworks, setFrameworks] = useState([]);
    const [libs, setLibs] = useState([]);
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleReturn = () => {
        handleClick("home");
    };

    const handleAddOrmBtn = () => {
        const newOrmId = Date.now().toString();
        setOrms((prevOrms) => [...prevOrms, { id: newOrmId, name: "" }]);
    };

    const handleOrmChange = (e, id) => {
        const value = e.target.value;
        setOrms((prevOrms) =>
            prevOrms.map((orm) =>
                orm.id === id ? { ...orm, name: value } : orm
            )
        );
    };

    const handleDeleteOrm = (id) => {
        setOrms((prevOrms) => prevOrms.filter((orm) => orm.id !== id));
    };

    const handleAddFrameworkBtn = () => {
        const newFrameworkId = Date.now().toString();
        setFrameworks((prevFr) => [
            ...prevFr,
            { id: newFrameworkId, name: "" },
        ]);
    };

    const handleFrameworkChange = (e, id) => {
        const value = e.target.value;
        setFrameworks((prevFr) =>
            prevFr.map((framework) =>
                framework.id === id ? { ...framework, name: value } : framework
            )
        );
    };

    const handleDeleteFramework = (id) => {
        setFrameworks((prevFrame) =>
            prevFrame.filter((frame) => frame.id !== id)
        );
    };

    const handleAddLibBtn = () => {
        const newId = Date.now().toString();
        setLibs((prev) => [...prev, { id: newId, name: "" }]);
    };

    const handleLibChange = (e, id) => {
        const value = e.target.value;
        setLibs((prevLibs) =>
            prevLibs.map((lib) =>
                lib.id === id ? { ...lib, name: value } : lib
            )
        );
    };

    const handleDeletelib = (id) => {
        setLibs((prevLibs) => prevLibs.filter((lib) => lib.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!langName) {
            setGlobalMessage({
                msg: "Language name cannot be empty.",
                type: "error",
            });
            return;
        }

        const language = {
            name: langName,
        };

        const ormNames = orms
            .map((orm) => orm.name.trim())
            .filter((name) => name !== "");
        if (ormNames.length > 0) {
            language.orms = ormNames;
        }

        const frameworkNames = frameworks
            .map((fw) => fw.name.trim())
            .filter((name) => name !== "");
        if (frameworkNames.length > 0) {
            language.frameworks = frameworkNames;
        }

        const libNames = libs
            .map((lib) => lib.name.trim())
            .filter((name) => name !== "");
        if (libNames.length > 0) {
            language.libraries = libNames;
        }

        const success = await createLanguege(language, setGlobalMessage);

        if (success) {
            handleReturn();
        }
    };

    return (
        <AdminSubPageLayout handleReturn={handleReturn}>
            <div>
                <form
                    className={styles.newLanguageForm}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <h1>Language name</h1>
                    <input
                        onChange={(e) => setLangeName(e.target.value)}
                        placeholder="Language name"
                        type="text"
                    ></input>
                    <h1>Orms</h1>

                    {orms.map((orm) => (
                        <div className={styles.section}>
                            <input
                                key={orm.id}
                                placeholder="ORM"
                                type="text"
                                onChange={(e) => handleOrmChange(e, orm.id)}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteOrm(orm.id)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOrmBtn}>
                        New Orm
                    </button>
                    <h1>Frameworks</h1>
                    {frameworks.map((framework) => (
                        <div className={styles.section}>
                            <input
                                key={framework.id}
                                placeholder="Framework"
                                type="text"
                                onChange={(e) =>
                                    handleFrameworkChange(e, framework.id)
                                }
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleDeleteFramework(framework.id)
                                }
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddFrameworkBtn}>
                        New Framework
                    </button>
                    <h1>Libraries</h1>
                    {libs.map((lib) => (
                        <div className={styles.section}>
                            <input
                                key={lib.id}
                                placeholder="Library"
                                type="text"
                                onChange={(e) => handleLibChange(e, lib.id)}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeletelib(lib.id)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddLibBtn}>
                        New library
                    </button>
                    <button type="submit">Add</button>
                </form>
            </div>
        </AdminSubPageLayout>
    );
}

function NewTechnology({ handleClick }) {
    const [name, setName] = useState(null);
    const [sections, setSections] = useState([]);
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleNewSectionBtn = (e) => {
        e.preventDefault();

        setSections((prev) => {
            const newId = Date.now().toString();
            return [...prev, { id: newId, header: "", content: "" }];
        });
    };

    const handleDeleteSectionBtn = (e, id) => {
        e.preventDefault();

        setSections((prev) => prev.filter((section) => section.id !== id));
    };

    const handleHeaderChnage = (e, id) => {
        e.preventDefault();

        setSections((prev) =>
            prev.map((section) =>
                section.id === id
                    ? { ...section, header: e.target.value }
                    : section
            )
        );
    };

    const handleContentChnage = (e, id) => {
        e.preventDefault();

        setSections((prev) =>
            prev.map((section) =>
                section.id === id
                    ? { ...section, content: e.target.value }
                    : section
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            setGlobalMessage({
                msg: "Name of the technology is required.",
                type: "error",
            });
            return;
        }

        const formatted_sections = sections
            .map((section) => ({
                header: section.header,
                content: section.content,
            }))
            .filter(
                (section) => section.header !== "" && section.content !== ""
            );

        if (formatted_sections.length < 1) {
            setGlobalMessage({
                msg: "At least 1 section is required.",
                type: "error",
            });
            return;
        }

        const tech = { name: name, sections: formatted_sections };

        const success = await createTech(tech, setGlobalMessage);

        if (success) {
            handleClick("home");
        }
    };

    return (
        <AdminSubPageLayout handleReturn={() => handleClick("home")}>
            <div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className={styles.newLanguageForm}
                >
                    <h1>Technology name</h1>
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Technology name"
                    ></input>
                    <h1>Sections</h1>
                    {sections.map((section) => (
                        <div key={section.id} className={styles.subSections}>
                            <div>
                                <input
                                    onChange={(e) =>
                                        handleHeaderChnage(e, section.id)
                                    }
                                    type="text"
                                    placeholder="header"
                                ></input>
                                <input
                                    onChange={(e) =>
                                        handleContentChnage(e, section.id)
                                    }
                                    type="text"
                                    placeholder="content"
                                ></input>
                            </div>
                            <button
                                onClick={(e) =>
                                    handleDeleteSectionBtn(e, section.id)
                                }
                            >
                                -
                            </button>
                        </div>
                    ))}

                    <button onClick={(e) => handleNewSectionBtn(e)}>
                        New section
                    </button>
                    <button>Create</button>
                </form>
            </div>
        </AdminSubPageLayout>
    );
}

function UpdateLanguage({ language, setLangToBeUpdated }) {
    const [langName, setLangeName] = useState(language.language);
    const [orms, setOrms] = useState(language.orms);
    const [frameworks, setFrameworks] = useState(language.frameworks);
    const [libs, setLibs] = useState(language.libraries);
    const [newOrms, setNewOrms] = useState([]);
    const [newFrameworks, setNewFrameworks] = useState([]);
    const [newLibs, setNewLibs] = useState([]);
    const [deletedOrms, setDeletedOrms] = useState([]);
    const [deletedFrameworks, setDeletedFrameworks] = useState([]);
    const [deletedlibs, setDeletedLibs] = useState([]);
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleReturn = () => {
        setLangToBeUpdated(null);
    };

    const handleAddOrmBtn = () => {
        const newOrmId = Date.now().toString();
        setNewOrms((prevOrms) => [...prevOrms, { id: newOrmId, name: "" }]);
    };

    const handleOrmChange = (e, id) => {
        const value = e.target.value;
        setOrms((prevOrms) =>
            prevOrms.map((orm) =>
                orm.id === id ? { ...orm, name: value } : orm
            )
        );
    };

    const handleNewOrmChange = (e, id) => {
        const value = e.target.value;
        setNewOrms((prevOrms) =>
            prevOrms.map((orm) =>
                orm.id === id ? { ...orm, name: value } : orm
            )
        );
    };

    const handleDeleteOrm = (id) => {
        setDeletedOrms((prev) => [...prev, id]);
        setOrms((prevOrms) => prevOrms.filter((orm) => orm.id !== id));
    };

    const handleDeleteNewOrm = (id) => {
        setNewOrms((prevOrms) => prevOrms.filter((orm) => orm.id !== id));
    };

    const handleAddFrameworkBtn = () => {
        const newFrameworkId = Date.now().toString();
        setNewFrameworks((prevFr) => [
            ...prevFr,
            { id: newFrameworkId, name: "" },
        ]);
    };

    const handleFrameworkChange = (e, id) => {
        const value = e.target.value;
        setFrameworks((prevFr) =>
            prevFr.map((framework) =>
                framework.id === id ? { ...framework, name: value } : framework
            )
        );
    };

    const handleNewFrameworkChange = (e, id) => {
        const value = e.target.value;
        setNewFrameworks((prevFr) =>
            prevFr.map((framework) =>
                framework.id === id ? { ...framework, name: value } : framework
            )
        );
    };

    const handleDeleteFramework = (id) => {
        setDeletedFrameworks((prev) => [...prev, id]);
        setFrameworks((prevFrame) =>
            prevFrame.filter((frame) => frame.id !== id)
        );
    };

    const handleDeleteNewFramework = (id) => {
        setNewFrameworks((prevFrame) =>
            prevFrame.filter((frame) => frame.id !== id)
        );
    };

    // new ones

    const handleAddNewLibBtn = () => {
        const newId = Date.now().toString();
        setNewLibs((prev) => [
            ...prev,
            { id: newId, name: "" },
        ]);
    };

    const handleLibChange = (e, id) => {
        const value = e.target.value;
        setLibs((prev) =>
            prev.map((lib) => (lib.id === id ? { ...lib, name: value } : lib))
        );
    };

    const handleNewLibChange = (e, id) => {
        const value = e.target.value;
        setNewLibs((prev) =>
            prev.map((lb) => (lb.id === id ? { ...lb, name: value } : lb))
        );
    };

    const handleDeleteLib = (id) => {
        setDeletedLibs((prev) => [...prev, id]);
        setLibs((prev) => prev.filter((lb) => lb.id !== id));
    };

    const handleDeleteNewLib = (id) => {
        setNewLibs((prev) => prev.filter((lb) => lb.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedLanguage = {};

        if (langName.trim() === "") {
            setGlobalMessage({
                msg: "Language name is required.",
                type: "error",
            });
            return;
        }

        // new name
        if (langName !== language.language) {
            updatedLanguage.new_name = langName.trim();
        }

        // new orms
        const newOrmNames = newOrms
            .map((orm) => orm.name.trim())
            .filter((name) => name !== "");
        if (newOrmNames.length > 0) {
            updatedLanguage.new_orms = newOrmNames;
        }

        // new frameworks
        const newFrameworksNames = newFrameworks
            .map((frame) => frame.name.trim())
            .filter((name) => name !== "");
        if (newFrameworksNames.length > 0) {
            updatedLanguage.new_frameworks = newFrameworksNames;
        }

        // new libs
        const newLibsNames = newLibs
            .map((lb) => lb.name.trim())
            .filter((lb) => lb !== "");
        if (newLibsNames.length > 0) {
            updatedLanguage.new_libraries = newLibsNames;
        }

        // old orms
        const updatedOrms = orms.filter((orm) => {
            const originalOrm = language.orms.find((o) => o.id === orm.id);
            return originalOrm && originalOrm.name !== orm.name.trim();
        });
        if (updatedOrms.length > 0) {
            updatedLanguage.old_orms = updatedOrms;
        }

        // old frameworks
        const updatedFrameworks = frameworks.filter((frame) => {
            const originalFramework = language.frameworks.find(
                (f) => f.id === frame.id
            );
            return (
                originalFramework &&
                originalFramework.name !== frame.name.trim()
            );
        });
        if (updatedFrameworks.length > 0) {
            updatedLanguage.old_frameworks = updatedFrameworks;
        }

        // old libraries
        const updatedLibs = libs.filter((lb) => {
            const originalLib = language.libraries.find(
                (lib) => lib.id === lb.id
            );
            return originalLib && originalLib.name !== lb.name.trim();
        });
        if (updatedLibs.length > 0) {
            updatedLanguage.old_libraries = updatedLibs;
        }

        // deleted orms
        if (deletedOrms.length > 0) {
            updatedLanguage.delete_orms = deletedOrms;
        }

        // deleted frameworks
        if (deletedFrameworks.length > 0) {
            updatedLanguage.delete_frameworks = deletedFrameworks;
        }

        // deleted libraries
        if (deletedlibs.length > 0) {
            updatedLanguage.delete_libraries = deletedlibs;
        }

        const success = await updateLanguege(
            language.id,
            updatedLanguage,
            setGlobalMessage
        );
        console.log(updatedLanguage);
        if (success) {
            handleReturn();
        }
    };

    return (
        <AdminSubPageLayout handleReturn={handleReturn}>
            <div>
                <form
                    className={styles.newLanguageForm}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <h1>Language name</h1>
                    <input
                        value={langName}
                        onChange={(e) => setLangeName(e.target.value)}
                        placeholder="Language name"
                        type="text"
                    ></input>
                    <h1>Orms</h1>
                    {orms.map((orm) => (
                        <div className={styles.section}>
                            <input
                                value={orm.name}
                                key={orm.id}
                                placeholder="ORM"
                                type="text"
                                onChange={(e) => handleOrmChange(e, orm.id)}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteOrm(orm.id)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    {newOrms.map((orm) => (
                        <div className={styles.section}>
                            <input
                                key={orm.id}
                                placeholder="ORM"
                                type="text"
                                onChange={(e) => handleNewOrmChange(e, orm.id)}
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteNewOrm(orm.id)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddOrmBtn}>
                        New Orm
                    </button>
                    <h1>Frameworks</h1>
                    {frameworks.map((framework) => (
                        <div className={styles.section}>
                            <input
                                key={framework.id}
                                value={framework.name}
                                placeholder="Framework"
                                type="text"
                                onChange={(e) =>
                                    handleFrameworkChange(e, framework.id)
                                }
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleDeleteFramework(framework.id)
                                }
                            >
                                -
                            </button>
                        </div>
                    ))}
                    {newFrameworks.map((framework) => (
                        <div className={styles.section}>
                            <input
                                key={framework.id}
                                placeholder="Framework"
                                type="text"
                                onChange={(e) =>
                                    handleNewFrameworkChange(e, framework.id)
                                }
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    handleDeleteNewFramework(framework.id)
                                }
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddFrameworkBtn}>
                        New Framework
                    </button>
                    <h1>Libraries</h1>
                    {libs.map((lib) => (
                        <div className={styles.section}>
                            <input
                                key={lib.id}
                                value={lib.name}
                                placeholder="Library"
                                type="text"
                                onChange={(e) =>
                                    handleLibChange(e, lib.id)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteLib(lib.id)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    {newLibs.map((lib) => (
                        <div className={styles.section}>
                            <input
                                key={lib.id}
                                placeholder="Library"
                                type="text"
                                onChange={(e) =>
                                    handleNewLibChange(e, lib.id)
                                }
                            />
                            <button
                                type="button"
                                onClick={() => handleDeleteNewLib(lib.id)}
                            >
                                -
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddNewLibBtn}>
                        New Library
                    </button>
                    <button type="submit">Update</button>
                </form>
            </div>
        </AdminSubPageLayout>
    );
}

// now we update the actual

function UpdateTechnology({ technology, setTechToBeEdited }) {
    const [name, setName] = useState(technology.name);
    const [sections, setSections] = useState(technology.section);
    const [newSections, setNewSections] = useState([]);
    const [deletedSections, setDeletedSections] = useState([]);
    const { setGlobalMessage } = useGlobalMessageContext();

    const handleReturn = () => {
        setTechToBeEdited(null);
    };

    const handleNewSectionBtn = () => {
        setNewSections((prev) => {
            const newId = Date.now().toString();
            return [...prev, { id: newId, header: "", content: "" }];
        });
    };

    const handleDeleteSectionBtn = (id) => {
        setDeletedSections((prev) => [...prev, id]);
        setSections((prev) => prev.filter((section) => section.id !== id));
    };

    const handleDeleteNewSectionBtn = (id) => {
        setNewSections((prev) => prev.filter((section) => section.id !== id));
    };

    const handleHeaderChnage = (e, id) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === id
                    ? { ...section, header: e.target.value }
                    : section
            )
        );
    };

    const handleNewHeaderChnage = (e, id) => {
        setNewSections((prev) =>
            prev.map((section) =>
                section.id === id
                    ? { ...section, header: e.target.value }
                    : section
            )
        );
    };

    const handleContentChnage = (e, id) => {
        setSections((prev) =>
            prev.map((section) =>
                section.id === id
                    ? { ...section, content: e.target.value }
                    : section
            )
        );
    };

    const handleNewContentChnage = (e, id) => {
        setNewSections((prev) =>
            prev.map((section) =>
                section.id === id
                    ? { ...section, content: e.target.value }
                    : section
            )
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedTech = {};

        if (name.trim() === "") {
            setGlobalMessage({
                msg: "Name of the technology is required.",
                type: "error",
            });
            return;
        }

        if (name !== technology.name) {
            updatedTech.new_name = name.trim();
        }

        // new sections
        const new_sections = newSections
            .map((section) => ({
                header: section.header,
                content: section.content,
            }))
            .filter(
                (section) => section.header !== "" && section.content !== ""
            );
        if (new_sections.length > 0) {
            updatedTech.new_sections = new_sections;
        }

        // old sections
        const updatedSections = sections.filter((section) => {
            const originalSection = technology.section.find(
                (s) => s.id === section.id
            );
            return (
                originalSection.header !== section.header ||
                originalSection.content !== section.content
            );
        });
        if (updatedSections.length > 0) {
            updatedTech.old_sections = updatedSections;
        }

        // deleted sections
        if (deletedSections.length > 0) {
            updatedTech.delete_sections = deletedSections;
        }

        console.log(updatedTech);

        const success = await updateTech(
            technology.id,
            updatedTech,
            setGlobalMessage
        );

        if (success) {
            handleReturn();
        }
    };

    return (
        <AdminSubPageLayout handleReturn={handleReturn}>
            <div>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className={styles.newLanguageForm}
                >
                    <h1>Technology name</h1>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Technology name"
                    ></input>
                    <h1>Sections</h1>
                    {sections.map((section) => (
                        <div key={section.id} className={styles.subSections}>
                            <div>
                                <input
                                    value={section.header}
                                    onChange={(e) =>
                                        handleHeaderChnage(e, section.id)
                                    }
                                    type="text"
                                    placeholder="header"
                                ></input>
                                <input
                                    value={section.content}
                                    onChange={(e) =>
                                        handleContentChnage(e, section.id)
                                    }
                                    type="text"
                                    placeholder="content"
                                ></input>
                            </div>
                            <button
                                type="button"
                                onClick={(e) =>
                                    handleDeleteSectionBtn(section.id)
                                }
                            >
                                -
                            </button>
                        </div>
                    ))}

                    {newSections.map((section) => (
                        <div key={section.id} className={styles.subSections}>
                            <div>
                                <input
                                    value={section.header}
                                    onChange={(e) =>
                                        handleNewHeaderChnage(e, section.id)
                                    }
                                    type="text"
                                    placeholder="header"
                                ></input>
                                <input
                                    value={section.content}
                                    onChange={(e) =>
                                        handleNewContentChnage(e, section.id)
                                    }
                                    type="text"
                                    placeholder="content"
                                ></input>
                            </div>
                            <button
                                type="button"
                                onClick={(e) =>
                                    handleDeleteNewSectionBtn(section.id)
                                }
                            >
                                -
                            </button>
                        </div>
                    ))}

                    <button type="button" onClick={handleNewSectionBtn}>
                        New section
                    </button>
                    <button>Update</button>
                </form>
            </div>
        </AdminSubPageLayout>
    );
}
