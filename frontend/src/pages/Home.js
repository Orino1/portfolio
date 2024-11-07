import MainLayout from "./MainLayout";
import styels from "../assets/styles/HomePage.module.css";
import "../assets/styles/styles.css";
import { Link } from "react-router-dom";
import PostCard from "../compenents/PostCard";
import { Helmet } from "react-helmet";

export default function Home() {
    return (
        <MainLayout>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className={styels.main}>
                <section></section>
                <section>
                    <div>
                        <div>
                            <p>MOHAMMED ELAOUJA</p>
                            <h1>
                                Building Solutions, One Line of Code at a Time
                                <span>.</span>
                            </h1>
                        </div>
                        <p>
                            With a focus on creating functional, responsive
                            applications, my work centers on delivering
                            straightforward solutions that address real-world
                            needs. A solid understanding of modern web
                            technologies allows me to contribute thoughtfully
                            within collaborative teams and adapt to project
                            requirements.
                        </p>
                    </div>
                </section>
                <section>
                    Having worked across front-end and back-end development,
                    including JavaScript and React, my experience has emphasized
                    building user experiences that balance creativity and
                    efficiency. Based in Morocco, I approach each project with
                    attention to quality, aiming to write code that aligns with
                    both client goals and user needs.
                </section>
            </div>
            <div className={`${styels.news} maxMainContainer`}>
                <div className="maxSubContainer">
                    <div>
                        <div>
                            <p>FROM THE BLOG</p>
                            <h1>
                                Latest <span>Posts.</span>
                            </h1>
                        </div>
                        <Link>
                            View All <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div>
                        <PostCard></PostCard>
                        <PostCard></PostCard>
                        <PostCard></PostCard>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
