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
                <Link className={styles.logo} to="/">ORINO</Link>
            </section>
            <section>hello</section>
            <section>
                <button onClick={handleToggle} className={styles[togglePosition]}>
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
                <Link onClick={() => handleClose((prev) => !prev)} to="#">
                    <p>PORTFOLIO</p>
                    <p>PORTFOLIO</p>
                    <span>02</span>
                </Link>
                <Link onClick={() => handleClose((prev) => !prev)} to="/about">
                    <p>ABOUT</p>
                    <p>ABOUT</p>
                    <span>03</span>
                </Link>
                <Link onClick={() => handleClose((prev) => !prev)} to="/contact">
                    <p>CONTACT</p>
                    <p>CONTACT</p>
                    <span>04</span>
                </Link>
                <Link onClick={() => handleClose((prev) => !prev)} to="/blog">
                    <p>BLOG</p>
                    <p>BLOG</p>
                    <span>05</span>
                </Link>
            </section>
            <section>
                <section>
                    <h4>Get In Touch</h4>
                    <p>El jadida, casablanca-state, Morocco.</p>
                    <p>soon@orino.me</p>
                    <p>Ph: +212 06 00 00 00 00</p>
                </section>
            </section>
        </div>
    );
}
