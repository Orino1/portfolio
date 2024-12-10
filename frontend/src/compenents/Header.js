import styles from "../assets/styles/NavigationBar.module.css";
import "../assets/styles/styles.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);
    const [togglePosition, setTogglePosition] = useState("start");
    const positions = ["start", "middle", "end"];
    const [isFixed, setIsFixed] = useState(false);

    const handleToggle = () => {
        const currentIndex = positions.indexOf(togglePosition);
        const nextIndex =
            currentIndex >= positions.length - 1 ? 0 : currentIndex + 1;
        setTogglePosition(positions[nextIndex]);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 130) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`${styles.nav} ${isFixed && styles.fixed} `}>
            <section>
                <button
                    onClick={() => setOpenMenu((prev) => !prev)}
                    className={openMenu && styles.active}
                >
                    <span></span>
                    <span></span>
                </button>
                {openMenu && <Menu handleClose={setOpenMenu}></Menu>}
                <Link className={styles.logo} to="/">
                    ORINO
                </Link>
            </section>
            <section></section>
            <section>
                <button
                    onClick={handleToggle}
                    className={styles[togglePosition]}
                >
                    <div>
                        <i className="fa-solid fa-sun"></i>
                        <i className="fa-solid fa-cloud"></i>
                        <i className="fa-solid fa-moon"></i>
                    </div>
                </button>
            </section>
        </nav>
    );
}

function Menu({ handleClose }) {
    return (
        <div className={`${styles.menu} 'fade-in'`}>
            <section>
                <Link onClick={() => handleClose((prev) => !prev)} to="/">
                    <p>HOME</p>
                    <p>HOME</p>
                    <span>01</span>
                </Link>
                <Link
                    onClick={() => handleClose((prev) => !prev)}
                    to="/contact"
                >
                    <p>CONTACT</p>
                    <p>CONTACT</p>
                    <span>02</span>
                </Link>
            </section>
            <section>
                <section>
                    <h4>Get In Touch</h4>
                    <p>
                        Currently based in El Jadida, Casablanca Province,
                        Morocco.
                    </p>
                    <p>
                        Email: <a href="mailto:contact@orino.me">contact@orino.me</a>
                    </p>
                    <p>
                        Phone/WhatsApp: <a href="tel:+212600000000">+212 600 000 000</a>
                    </p>
                </section>
            </section>
        </div>
    );
}
