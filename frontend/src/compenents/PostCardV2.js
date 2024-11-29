import styles from "../assets/styles/PostCardV2.module.css";
import "../assets/styles/styles.css";
import Tag from "./Tag";
import { Link } from "react-router-dom";

export default function PostCardV2({post}) {
    const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={styles.container}>
            <img></img>
            <div>
                <p>{formattedDate}</p>
                <h2>
                    {post.title}
                </h2>
                <p>{post.content}</p>
                <div>
                    <Tag tag="Digital"></Tag>
                    <Tag tag="Marketing"></Tag>
                </div>
                <Link>Read more <i class="fa-solid fa-arrow-right"></i></Link>
            </div>
        </div>
    );
}
