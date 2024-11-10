import styles from "../assets/styles/PostCardV2.module.css";
import "../assets/styles/styles.css";
import Tag from "./Tag";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PostCardV3() {
    const [unlisted, setUnlisted] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState(false);

    return (
        <div className={`${styles.container} ${unlisted && styles.unlisted}`}>
            <img></img>
            <div>
                <p>juillet 5, 2020 4 min read</p>
                <h2>
                    The Highly Creative UI/UX Workflow from a Silicon Valley.
                </h2>
                <p>
                    Using a Query A CSS pseudo-class is a keyword added to a
                    thing that will always be greate even togh you cannot see it
                    so what what we think abuot it
                </p>
                <div>
                    <Tag tag="Digital"></Tag>
                    <Tag tag="Marketing"></Tag>
                </div>
                <Link>
                    Read more <i class="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
            <div
                className={styles.ballContainer}
                onClick={() => setUnlisted((prev) => !prev)}
            >
                <div className={unlisted && styles.unlisted}></div>
                <label>{unlisted ? "Re-list" : "Un-list"}</label>
            </div>
            <i className="fa-solid fa-trash" onClick={() => setToBeDeleted(prev => !prev)}></i>
            <i className="fa-solid fa-trash"></i>
            {toBeDeleted && <div className={styles.deleteDialog}>
                <div>
                    <p>Deleted posts are permanently lost and cannot be recovered.</p>
                    <div>
                        <button onClick={() => setToBeDeleted(prev => !prev)}>Cancel</button>
                        <button>Confirm</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}
