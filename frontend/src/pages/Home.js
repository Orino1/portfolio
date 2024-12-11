import MainLayout from "./MainLayout";
import styels from "../assets/styles/HomePage.module.css";
import "../assets/styles/styles.css";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { fetchAllProjects, fetchSkills } from "../apiService";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import ProjectCardV1 from "../compenents/ProjectCardV1";
import LanguageCard from "../compenents/LanguageCard";
import GeneralSkillCard from "../compenents/GeneralSkillCard";
import Banner from "../assets/images/banner.svg";

export default function Home() {
    const { setGlobalMessage } = useGlobalMessageContext();
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState(null);
    const realName = process.env.REACT_APP_REALNAME

    useEffect(() => {
        const getProjects = async () => {
            const data = await fetchAllProjects(setGlobalMessage);

            if (data) {
                setProjects(data.projects);
            }
        };

        getProjects();
    }, []);

    useEffect(() => {
        const getSkills = async () => {
            const data = await fetchSkills(setGlobalMessage);
            setSkills(data);
        };
        getSkills();
    }, []);

    return (
        <MainLayout>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className={styels.main}>
                <section>
                    <img src={Banner} />
                </section>
                <section>
                    <div>
                        <div>
                            <p>{realName}</p>
                            <h1>
                                Building Solutions, for Your Needs
                                <span>.</span>
                            </h1>
                        </div>
                        <p>
                            Having worked across a range of projects, including
                            roles such as a software quality tester and a former
                            board repairman, I bring a diverse skill set with a
                            strong focus on troubleshooting and problem-solving.
                            My experience in quality assurance ensures that
                            every project is delivered with the highest
                            standards of reliability and performance. With
                            expertise in both front-end and back-end
                            development, I focus on crafting seamless user
                            experiences while maintaining efficiency and
                            creativity. Based in Morocco, I consistently strive
                            for precision and alignment with both client
                            objectives and user needs.
                        </p>
                    </div>
                </section>
                <section>
                    Building responsive applications that solve real-world
                    problems, with the ability to integrate into teams using a
                    diverse range of technologies and stacks to deliver
                    effective solutions.
                </section>
            </div>
            {projects && projects.length > 0 ? (
                <div className={`${styels.news} maxMainContainer`}>
                    <div className="maxSubContainer">
                        <div>
                            <div>
                                <p></p>
                                <h1>
                                    Latest <span>Projects.</span>
                                </h1>
                            </div>
                        </div>
                        <div>
                            {projects.map((project) => (
                                <ProjectCardV1
                                    key={project.id}
                                    project={project}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}

            {skills && skills.languages && (
                <div
                    className={`${styels.news} ${styels.languages} maxMainContainer`}
                >
                    <div className="maxSubContainer">
                        <div>
                            <div>
                                <p></p>
                                <h1>
                                    Programming <span>languages.</span>
                                </h1>
                            </div>
                        </div>
                        <div>
                            {skills.languages.map((language) => (
                                <LanguageCard
                                    key={language.id}
                                    language={language}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {skills && skills.technologies && (
                <div className={`${styels.news} maxMainContainer`}>
                    <div className="maxSubContainer">
                        <div>
                            <div>
                                <p></p>
                                <h1>
                                    Other <span>technologies.</span>
                                </h1>
                            </div>
                        </div>
                        <div>
                            {skills.technologies.map((tech) => (
                                <GeneralSkillCard key={tech.id} skill={tech} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </MainLayout>
    );
}
