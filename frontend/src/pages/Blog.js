import styles from "../assets/styles/BlogPage.module.css";
import MainLayout from "./MainLayout";
import PostCardV2 from "../compenents/PostCardV2";
import { Helmet } from "react-helmet";

export default function Blog() {
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
                                <PostCardV2></PostCardV2>
                                <PostCardV2></PostCardV2>
                                <PostCardV2></PostCardV2>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
