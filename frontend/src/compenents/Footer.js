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
                            <Link><i className="fa-brands fa-linkedin"></i></Link>
                            <Link><i className="fa-brands fa-facebook"></i></Link>
                            <Link><i className="fa-brands fa-youtube"></i></Link>
                            <Link><i className="fa-brands fa-x-twitter"></i></Link>
                        </div>
                    </div>
                    <div>
                        <h4>Location</h4>
                        <div>
                            <div>
                                <p>Country: </p>
                                <h4>Morocco</h4>
                            </div>
                            <div>
                                <p>City:</p>
                                <h4>El Jadida</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>Work inquiries</h4>
                        <div>
                            <p>Contact me at</p>
                            <h4>soon@orino.me</h4>
                            <p>or</p>
                            <h4>+212600000000</h4>
                        </div>
                    </div>
                    <div>
                        <h4>Sign up for the newsletter</h4>
                        <div>
                            <form className={styles.newsLetterForm}>
                                <fieldset className={email && styles.active}>
                                    <input
                                        onBlur={handleBlur}
                                        onChange={(e) => handleChange(e)}
                                        type="text"
                                    ></input>
                                    <legend>Email</legend>
                                </fieldset>
                                {err && (
                                    <ErrorMessage message={err}></ErrorMessage>
                                )}
                                <button>Sign up</button>
                            </form>
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
