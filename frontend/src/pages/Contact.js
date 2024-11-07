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
                        <button>Send an Email</button>
                    </div>
                </div>
                <div className={styles.content}>
                    <div></div>
                    <div>
                        <div>
                            <div>
                                <i className="fa-solid fa-message"></i>
                            </div>
                            <h3>Get in touch</h3>
                            <p>Work and general inquiries</p>
                            <h2>contact@nexular-corp.com</h2>
                            <h2>+212 (0)6.61.31.88.16</h2>
                        </div>
                        <div>
                            <div>
                                <i className="fa-regular fa-clock"></i>
                            </div>
                            <p>Availability hours:</p>
                            <h3>Monday – Friday</h3>
                            <h3>9 am to 5 pm GMT+2</h3>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
