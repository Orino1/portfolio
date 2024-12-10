import styles from "../assets/styles/AdminPostsPage.module.css";
import "../assets/styles/styles.css";
import PostCardV3 from "../compenents/PostCardV3";
import { useState, useEffect } from "react";
import AdminSubPageLayout from "./AdminSubPageLayout";
import {
    fetchAllPosts,
    fetchThumbnails,
    updatePost,
    uploadThumbnail,
    createPost,
    deletePost,
} from "../apiService";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";

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
    const [posts, setPosts] = useState(null);
    const [postToBeUpdated, setPostToBeUpdated] = useState(null);
    const { setGlobalMessage } = useGlobalMessageContext();

    useEffect(() => {
        const ftechPosts = async () => {
            const data = await fetchAllPosts();
            if (data) {
                setPosts(data.posts);
            }
        };

        ftechPosts();
    }, []);

    const handleDelete = async (post_id) => {
        const success = await deletePost(post_id, setGlobalMessage);
        if (success) {
            setPosts((prevPosts) => prevPosts.filter((post) => post.id !== post_id));
        }
    };

    const handleUpdate = (post) => {
        setPostToBeUpdated(post);
    };

    return (
        <>
            {postToBeUpdated ? (
                <UpdatePost
                    post={postToBeUpdated}
                    handleClick={() => {
                        setPostToBeUpdated(null);
                        handleClick("main");
                    }}
                />
            ) : (
                <div
                    className={`sub-admin-page-layout ${styles.homeContainer}`}
                >
                    <div>
                        <h1>
                            Posts<span>.</span> ({posts ? posts.length : 0})
                        </h1>
                        <button onClick={() => handleClick("newPost")}>
                            New Post
                        </button>
                    </div>
                    <div>
                        {posts &&
                            posts.map((post) => (
                                <PostCardV3
                                    key={post.id}
                                    post={post}
                                    handleDelete={handleDelete}
                                    handleUpdate={handleUpdate}
                                />
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}

function NewPost({ handleClick }) {
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [thumbnailId, setThumbnailId] = useState(null);
    const [thumbnails, setThumbnails] = useState(null);
    const { setGlobalMessage } = useGlobalMessageContext();
    const [file, setFile] = useState(null);

    useEffect(() => {
        const getThumbnails = async () => {
            const data = await fetchThumbnails(setGlobalMessage);

            if (data) {
                setThumbnails(data.thumbnails);
            }
        };

        getThumbnails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title) {
            setGlobalMessage({msg: "Title cannot be empty.", type: "error"});
            return;
        }
        if (!content) {
            setGlobalMessage({msg: "Content cannot be empty.", type: "error"});
            return;
        }
        if (!thumbnailId) {
            setGlobalMessage({msg: "Select a thumbnail.", type: "error"});
            return;
        }

        console.log(
            {title: title, content: content, thumbnail_id: thumbnailId}
        )
        const success = await createPost({title: title, content: content, thumbnail_id: thumbnailId}, setGlobalMessage);

        if (success) {
            handleClick("main");
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        const upload = async () => {
            const formData = new FormData();
            formData.append("file", file);

            const success = await uploadThumbnail(formData, setGlobalMessage);

            if (success) {
                const data = await fetchThumbnails(setGlobalMessage);

                if (data) {
                    console.log(data);
                    setThumbnails(data.thumbnails);
                }
            }

            setFile(null);
        };

        if (file) {
            upload();
        }
    }, [file]);

    const handleReturn = () => {
        handleClick("main");
    };

    return (
        <AdminSubPageLayout handleReturn={handleReturn}>
            <div className={styles.newPostContainer}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Select a thumbnail</h1>
                    <div className={styles.thumbnailContainer}>
                        {thumbnails &&
                            thumbnails.map((thumbnail) => (
                                <img
                                    onClick={() =>
                                        setThumbnailId(thumbnail.id)
                                    }
                                    key={thumbnail.id}
                                    className={
                                        thumbnail.id === thumbnailId
                                            ? styles.selected
                                            : ""
                                    }
                                ></img>
                            ))}
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e)}
                        ></input>
                    </div>
                    <h1>Select a category</h1>
                    <div>
                        <div>News</div>
                        <div>Digital</div>
                        <div>Marketing</div>
                    </div>
                    <h1>Title</h1>
                    <input onChange={(e) => setTitle(e.target.value)} placeholder="title"></input>
                    <h1>Post content</h1>
                    <textarea onChange={(e) => setContent(e.target.value)} placeholder="post content"></textarea>
                    <button>Post</button>
                </form>
            </div>
        </AdminSubPageLayout>
    );
}

function UpdatePost({ post, handleClick }) {
    const [newTitle, setNewTitle] = useState(post.title);
    const [newContent, setNewContent] = useState(post.content);
    const [newThumbnail, setNewThumbnail] = useState(post.thumbnail_id);
    const [thumbnails, setThumbnails] = useState(null);
    const { setGlobalMessage } = useGlobalMessageContext();
    const [file, setFile] = useState(null);

    useEffect(() => {
        const getThumbnails = async () => {
            const data = await fetchThumbnails(setGlobalMessage);

            if (data) {
                console.log(data);
                setThumbnails(data.thumbnails);
            }
        };

        getThumbnails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let body = {};

        if (newTitle !== post.title) {
            body.title = newTitle;
        }
        if (newContent !== post.content) {
            body.content = newContent;
        }
        if (newThumbnail !== post.thumbnail_id) {
            body.thumbnail_id = newThumbnail;
        }

        const success = await updatePost(post.id, body, setGlobalMessage);

        if (success) {
            handleClick();
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        const upload = async () => {
            const formData = new FormData();
            formData.append("file", file);

            const success = await uploadThumbnail(formData, setGlobalMessage);

            if (success) {
                const data = await fetchThumbnails(setGlobalMessage);

                if (data) {
                    console.log(data);
                    setThumbnails(data.thumbnails);
                }
            }

            setFile(null);
        };

        if (file) {
            upload();
        }
    }, [file]);

    return (
        <AdminSubPageLayout handleReturn={handleClick}>
            <div className={styles.newPostContainer}>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h1>Select a thumbnail</h1>
                    <div className={styles.thumbnailContainer}>
                        {thumbnails &&
                            thumbnails.map((thumbnail) => (
                                <img
                                    onClick={() =>
                                        setNewThumbnail(thumbnail.id)
                                    }
                                    key={thumbnail.id}
                                    className={
                                        thumbnail.id === newThumbnail
                                            ? styles.selected
                                            : ""
                                    }
                                ></img>
                            ))}
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(e)}
                        ></input>
                    </div>
                    <h1>Select a category</h1>
                    <div>
                        <div>News</div>
                        <div>Digital</div>
                        <div>Marketing</div>
                    </div>
                    <h1>Title</h1>
                    <input
                        onChange={(e) => setNewTitle(e.target.value)}
                        value={newTitle}
                        placeholder="title"
                    ></input>
                    <h1>Post content</h1>
                    <textarea
                        onChange={(e) => setNewContent(e.target.value)}
                        value={newContent}
                        placeholder="post content"
                    ></textarea>
                    <button>Update</button>
                </form>
            </div>
        </AdminSubPageLayout>
    );
}
