import styles from "../assets/styles/Footer.module.css";
import { Link } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";

export default function Footer() {
    // handling the of the email input
    const [email, setEmail] = useState(null);
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    };

    const handleBlur = () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            setErr("Please enter a valid email address");
        } else {
            setErr(null);
        }
    };

    return (
        <footer className={styles.footer}>
            <div>
                <section>
                    <div>
                        <h4>ORINO</h4>
                        <div className={styles.firstSub}>
                            <Link>
                                <i className="fa-brands fa-linkedin"></i>
                            </Link>
                            <Link>
                                <i className="fa-brands fa-facebook"></i>
                            </Link>
                            <Link>
                                <i className="fa-brands fa-youtube"></i>
                            </Link>
                            <Link>
                                <i className="fa-brands fa-x-twitter"></i>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h4>Location</h4>
                        <p>
                            Currently based in El Jadida, Casablanca Province,
                            Morocco.
                        </p>
                    </div>
                    <div>
                        <h4>Work Inquiries</h4>
                        <div>
                            <p>
                                Email:
                                <a href="mailto:contact@orino.me">
                                    contact@orino.me
                                </a>
                            </p>
                            <p>
                                Phone/WhatsApp:
                                <a href="tel:+212600000000">+212 600 000 000</a>
                            </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div>© 2024, Orino. Made with passion</div>
                    <div>
                        <Link>Privacy & Cookie Policy </Link>|
                        <Link> Terms of Service</Link>
                    </div>
                </section>
            </div>
        </footer>
    );
}
