import styles from "../assets/styles/PostCardV2.module.css";
import "../assets/styles/styles.css";
import Tag from "./Tag";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import { togglePostListing, deletePost } from "../apiService";

export default function PostCardV3({ post, handleDelete, handleUpdate }) {
    const [unlisted, setUnlisted] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState(false);
    const { setGlobalMessage } = useGlobalMessageContext();

    const formattedDate = new Date(post.created_at).toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric",
        }
    );

    useEffect(() => {
        const checkListed = () => {
            setUnlisted(!post.listed);
        };

        checkListed();
    }, []);

    const handleListingToggle = async () => {
        const success = await togglePostListing(post.id, setGlobalMessage);

        if (success) {
            setUnlisted((prev) => !prev);
        }
    };

    const handleDeletion = async () => {
        const success = await deletePost(post.id, setGlobalMessage);

        if (success) {
            handleDelete(post.id);
        }
    };

    return (
        <div className={`${styles.container} ${unlisted && styles.unlisted}`}>
            <img></img>
            <div>
                <p>{formattedDate}</p>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <div>
                    <Tag tag="Digital"></Tag>
                    <Tag tag="Marketing"></Tag>
                </div>
                <Link>
                    Read more <i class="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
            <div className={styles.ballContainer} onClick={handleListingToggle}>
                <div className={unlisted && styles.unlisted}></div>
                <label>{unlisted ? "Re-list" : "Un-list"}</label>
            </div>
            <i
                className="fa-solid fa-trash"
                onClick={() => setToBeDeleted((prev) => !prev)}
            ></i>
            <i className="fa-solid fa-trash"></i>
            <i className="fa-regular fa-pen-to-square" onClick={() => handleUpdate(post)}></i>
            {toBeDeleted && (
                <div className={styles.deleteDialog}>
                    <div>
                        <p>
                            Deleted posts are permanently lost and cannot be
                            recovered.
                        </p>
                        <div>
                            <button
                                onClick={() => setToBeDeleted((prev) => !prev)}
                            >
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(post.id)}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
