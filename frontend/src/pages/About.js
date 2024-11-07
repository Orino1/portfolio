import MainLayout from "./MainLayout";
import styles from "../assets/styles/AboutPage.module.css";
import "../assets/styles/styles.css";
import { Link } from "react-router-dom";
import LanguageCard from "../compenents/LanguageCard";
import GeneralSkillCard from "../compenents/GeneralSkillCard";
import { Helmet } from "react-helmet";

export default function About() {
    return (
        <MainLayout>
            <Helmet>
                <title>About</title>
            </Helmet>
            <div className={styles.container}>
                <div className="maxMainContainer">
                    <div className={`${styles.section} maxSubContainer`}>
                        <h1>About</h1>
                        <p>
                            My name is Mohammed Elaouja, a dedicated full-stack
                            developer with a strong passion for web and mobile
                            development. I thrive on building innovative
                            solutions and am always eager to take on new and
                            exciting projects that push the boundaries of
                            technology. I am committed to continuous learning
                            and delivering high-quality, scalable code that
                            meets modern standards. If you’re looking for a
                            developer who’s driven, adaptable, and ready to
                            bring your vision to life, let’s connect.
                        </p>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <div className={`${styles.section} maxSubContainer`}>
                        <h1>Skills and Technologies</h1>
                        <div>
                            <section>
                                <h2>Languages</h2>
                                <div>
                                    <LanguageCard></LanguageCard>
                                    <LanguageCard></LanguageCard>
                                    <LanguageCard></LanguageCard>
                                    <LanguageCard></LanguageCard>
                                </div>
                            </section>
                            <section>
                                <h2>Technologies</h2>
                                <div>
                                <GeneralSkillCard></GeneralSkillCard>
                                <GeneralSkillCard></GeneralSkillCard>
                                <GeneralSkillCard></GeneralSkillCard>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </MainLayout>
    );
}
