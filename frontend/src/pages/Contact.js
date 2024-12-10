import MainLayout from "./MainLayout";
import styles from "../assets/styles/ContactPage.module.css";
import "../assets/styles/styles.css";
import { Helmet } from "react-helmet";

export default function Contact() {
    return (
        <MainLayout>
            <Helmet>
                <title>Contact</title>
            </Helmet>
            <div className={styles.container}>
                <div className={`${styles.header} maxMainContainer`}>
                    <div className="maxSubContainer">
                        <h1>Contact</h1>
                        <p>
                            I’m here to assist with any inquiries or projects
                            you may have. Feel free to reach out, and I’ll get
                            back to you within a couple of hours.
                        </p>
                        <a href="mailto:contact@orino.me">Send an email</a>
                    </div>
                </div>
                <div className={`${styles.content} maxMainContainer`}>
                    <div className={`${styles.subContent} maxSubContainer`}>
                        <div>
                            <i className="fa-solid fa-message"></i>
                            <h3>Get in touch</h3>
                            <p>Work and general inquiries</p>
                            <a href="mailto:contact@orino.me">contact@orino.me</a>
                            <a href="tel:+212600000000">+212 600 000 000</a>
                        </div>
                        <div>
                            <i className="fa-regular fa-clock"></i>
                            <h3>Availability hours</h3>
                            <p>Monday – Friday</p>
                            <p>9 am to 5 pm GMT+2</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
