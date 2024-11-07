import styles from "../assets/styles/PostCard.module.css";
import { Link } from "react-router-dom";
import Tag from "./Tag";

export default function PostCard() {
  return (
    <Link to="#" className={styles.container}>
        <div>
            <img></img>
            <p>juillet 5, 2020
            4 min read</p>
            <h2>The Highly Creative UI/UX Workflow from a Silicon Valley.</h2>
            <div>
                <Tag tag='Digital'></Tag>
                <Tag tag='Marketing'></Tag>
            </div>
        </div>
    </Link>
  )
}


