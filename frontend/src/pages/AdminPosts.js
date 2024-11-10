import styles from "../assets/styles/AdminPostsPage.module.css";
import "../assets/styles/styles.css";
import PostCardV3 from "../compenents/PostCardV3";
import { useState } from "react";
import AdminSubPageLayout from "./AdminSubPageLayout";

export default function AdminPosts() {
    const [content, setContent] = useState("main");

    const renderContent = () => {
        switch (content) {
            case "main":
                return <Home handleClick={setContent}></Home>;
            case "newPost":
                return <NewPost handleClick={setContent}></NewPost>;
        }
    };
    return renderContent();
}

function Home({ handleClick }) {
    return (
        <div className={`sub-admin-page-layout ${styles.homeContainer}`}>
            <div>
                <h1>
                    Posts<span>.</span> (1)
                </h1>
                <button onClick={() => handleClick("newPost")}>New Post</button>
            </div>
            <div>
                <PostCardV3></PostCardV3>
                <PostCardV3></PostCardV3>
                <PostCardV3></PostCardV3>
                <PostCardV3></PostCardV3>
                <PostCardV3></PostCardV3>
                <PostCardV3></PostCardV3>
            </div>
        </div>
    );
}

function NewPost({ handleClick }) {
    const handleReturn = () => {
        handleClick("main");
    };

    return (
        <AdminSubPageLayout handleReturn={handleReturn}>
            <div className={styles.newPostContainer}>
                <form>
                    <h1>Select a category</h1>
                    <div>
                        <div>News</div>
                        <div>Digital</div>
                        <div>Marketing</div>
                    </div>
                    <h1>Title</h1>
                    <input placeholder="title"></input>
                    <h1>Post content</h1>
                    <textarea placeholder="post content"></textarea>
                    <button>Post</button>
                </form>
            </div>
        </AdminSubPageLayout>
    );
}
