import styles from "../assets/styles/PostCardV2.module.css";
import "../assets/styles/styles.css";
import Tag from "./Tag";
import { Link } from "react-router-dom";

export default function PostCardV2() {
    return (
        <div className={styles.container}>
            <img></img>
            <div>
                <p>juillet 5, 2020 4 min read</p>
                <h2>
                    The Highly Creative UI/UX Workflow from a Silicon Valley.
                </h2>
                <p>Using a Query A CSS pseudo-class is a keyword added to a thing that will always be greate even togh you cannot see it so what what we think abuot it</p>
                <div>
                    <Tag tag="Digital"></Tag>
                    <Tag tag="Marketing"></Tag>
                </div>
                <Link>Read more <i class="fa-solid fa-arrow-right"></i></Link>
            </div>
        </div>
    );
}
