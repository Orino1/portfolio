import styles from "../assets/styles/BottomNavigation.module.css";
import "../assets/styles/styles.css";
import { Link } from "react-router-dom";

export default function BottomNavigation() {
    return (
        <div className={`${styles.container} maxMainContainer`}>
            <div className="maxSubContainer">
                <div>
                    <h1>Explore more <span>Sections</span></h1>
                </div>
                <div>
                    <Link to="#">
                        <i class="fa-solid fa-arrow-right"></i>
                        <label>Previous</label>
                    </Link>
                    <Link to="#">
                        <i class="fa-solid fa-arrow-right"></i>
                        <label>Next</label>
                    </Link>
                </div>
            </div>
        </div>
    );
}
