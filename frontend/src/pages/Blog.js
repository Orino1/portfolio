import styles from "../assets/styles/BlogPage.module.css";
import MainLayout from "./MainLayout";
import PostCardV2 from "../compenents/PostCardV2";
import { Helmet } from "react-helmet";
import { fetchAllListedPosts } from "../apiService";
import { useGlobalMessageContext } from "../contexts/GlobalMessageContext";
import { useState, useEffect } from "react";

export default function Blog() {
    const [posts, setPosts] = useState(null);
    const {setGlobalMessage} = useGlobalMessageContext();

    useEffect(() => {
        const getAllPosts = async () => {
            const data = await fetchAllListedPosts(setGlobalMessage);
            if (data) {
                setPosts(data.posts);
            }
        };

        getAllPosts();
    }, []);

    return (
        <MainLayout>
            <Helmet>
                <title>Blog</title>
            </Helmet>
            <div className={`${styles.container} maxMainContainer`}>
                <div className="maxSubContainer">
                    <h1>Blog</h1>
                    <div>
                        <section>
                            <p>Search</p>
                            <div>
                                <input></input>
                                <button>Search</button>
                            </div>
                        </section>
                        <div>
                            <section>Filter</section>
                            <section>
                                {posts && posts.map(post => (
                                    <PostCardV2 post={post}></PostCardV2>
                                ))}
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
