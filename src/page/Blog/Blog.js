/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Header from "../../common/Header/Header";
import homeImage from "../../assets/images/pet_login.png";
import Footer from "../../common/Footer/Footer";
import video from "../../assets/videos/petvideo.mp4";
import BlogService from "../../config/service/BlogService";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Blog.css";
import Loading from "../../lib/Loading/Loading";

const Blog = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [selectedTag, setSelectedTag] = useState("All");
    const history = useHistory();

    useEffect(() => {
        setIsLoading(true);
        BlogService.getAllTags().then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    tagId: item.tagId,
                    name:
                        item.name.charAt(0).toUpperCase() + item.name.slice(1),
                };
            });
            setTags(dataSources);
        });
        BlogService.getAllBlogs().then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    postId: item.postId,
                    title: item.title,
                    content: item.content,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                    image: item.image,
                    tags: item.tags,
                    views: item.views,
                    comments: item.comments,
                    likes: item.likes,
                    userId: item.userId,
                    mail: item.mail,
                    phone: item.phone,
                };
            });
            setBlogs(dataSources);
            setIsLoading(false);
        });
    }, []);

    const handleClickImage = (e) => {
        const id =
            e.target.parentElement.parentElement.getAttribute("data-key");

        history.push(`/detail/${id}`);
        window.scrollTo(0, 0);
    };

    const handleClickTitle = (e) => {
        const id =
            e.target.parentElement.parentElement.getAttribute("data-key");
        history.push(`/detail/${id}`);
        window.scrollTo(0, 0);
    };

    const handleClickTag = (e) => {
        setSelectedTag(e.target.textContent);
    };

    const filteredBlogs =
        selectedTag.toLowerCase() === "all"
            ? blogs
            : blogs.filter((blog) =>
                  blog.tags.includes(selectedTag.toLowerCase())
              );

    return (
        <div className="tm-page-wrap mx-auto">
            <div className="position-relative">
                <Header />
                <div id="tm-video-container" style={{ position: "relative" }}>
                    <video
                        style={{ width: "100%" }}
                        autoPlay
                        muted
                        loop
                        id="tm-video"
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                </div>
            </div>

            <div className="container-fluid">
                <div id="content" className="mx-auto tm-content-container">
                    <main>
                        <div className="row">
                            <div className="col-12">
                                <h2 className="tm-page-title mb-4">
                                    Our Blog Catalog
                                </h2>
                                <div className="tm-categories-container mb-5">
                                    <h3 className="tm-text-primary tm-categories-text">
                                        List tags:
                                    </h3>
                                    <ul className="nav tm-category-list">
                                        <h2>List tags : </h2>
                                        <div
                                            className="nav-item tm-category-item "
                                            key={0}
                                        >
                                            <span
                                                style={{
                                                    padding: "5px 10px",
                                                    borderRadius: 20,
                                                    backgroundColor: "#12a1ed",
                                                    color: "#333",
                                                    marginRight: 10,
                                                    fontSize: 20,
                                                    cursor: "pointer",
                                                }}
                                                href="#"
                                                className="nav-link tm-category-link"
                                                onClick={handleClickTag}
                                            >
                                                All
                                            </span>
                                        </div>
                                        {tags.map((item) => {
                                            return (
                                                <div
                                                    className="nav-item tm-category-item"
                                                    key={item.key + 1}
                                                >
                                                    <span
                                                        style={{
                                                            padding: "5px 10px",
                                                            borderRadius: 20,
                                                            backgroundColor:
                                                                "#12a1ed",
                                                            color: "#333",
                                                            marginRight: 10,
                                                            fontSize: 20,
                                                            cursor: "pointer",
                                                        }}
                                                        href="#"
                                                        className="nav-link tm-category-link"
                                                        onClick={handleClickTag}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="row tm-catalog-item-list">
                            {filteredBlogs.map((item) => {
                                return (
                                    <div
                                        className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item"
                                        key={item.key}
                                        data-key={item.postId}
                                    >
                                        <div className="position-relative tm-thumbnail-container">
                                            <img
                                                src={item.image}
                                                style={{
                                                    width: 610,
                                                    height: 380,
                                                    cursor: "pointer",
                                                    borderRadius: 20,
                                                    border: "8px solid var(--primary-color)",
                                                }}
                                                alt="pet"
                                                className="img-fluid tm-catalog-item-img"
                                                onClick={handleClickImage}
                                            />
                                        </div>
                                        <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                            <h3
                                                className="tm-text-primary mb-3 tm-catalog-item-title"
                                                onClick={handleClickTitle}
                                                style={{
                                                    cursor: "pointer",
                                                    color: "var(--primary-color)",
                                                }}
                                            >
                                                {item.title}
                                            </h3>
                                            {/* <h3
                                                className="tm-text-primary mb-3 tm-catalog-item-title blog-title"
                                                onClick={handleClickTitle}
                                                style={{
                                                    cursor: "pointer",
                                                    color: "var(--primary-color)",
                                                }}
                                            >
                                                {item.title}
                                            </h3> */}
                                            {/* <div
                                                dangerouslySetInnerHTML={{
                                                    __html: item.content,
                                                }}
                                            ></div> */}
                                        </div>
                                    </div>
                                );
                            })}
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        className="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        className="position-absolute tm-img-overlay"
                                    >
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">
                                        Sagittis sodales enim
                                    </h3>
                                    <p className="tm-catalog-item-text">
                                        You are allowed to use this video
                                        catalog for your business websites.
                                        Please do not make a re-distribution of
                                        our template ZIP file on any template
                                        collection website.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        className="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        className="position-absolute tm-img-overlay"
                                    >
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">
                                        Nam tincidunt consectetur
                                    </h3>
                                    <p className="tm-catalog-item-text">
                                        You can apply this template for your
                                        commercial CMS theme. Nam sem leo,
                                        imperdiet non lacinia eget, volutpat ac
                                        massa. Donec mattis in velit quis
                                        commodo. Cras nec rutrum arcu.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        className="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        className="position-absolute tm-img-overlay"
                                    >
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">
                                        Praesent posuere rhoncus
                                    </h3>
                                    <p className="tm-catalog-item-text">
                                        Duis vulputate nisl metus, eget dapibus
                                        nunc ultricies id. Ut augue mauris,
                                        varius quis nulla non, sollicitudin
                                        consectetur nisl. Donec eget arcu
                                        placerat, ullamcorper.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div className="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        className="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        className="position-absolute tm-img-overlay"
                                    >
                                        <i className="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div className="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 className="tm-text-primary mb-3 tm-catalog-item-title">
                                        Turpis massa aliquam
                                    </h3>
                                    <p className="tm-catalog-item-text">
                                        Nunc neque risus, ultrices sed luctus
                                        at, iaculis at arcu. Pellentesque rutrum
                                        velit nec sapien ullamcorper ultrices.
                                        Vestibulum lectus risus, laoreet pretium
                                        ipsum
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <div>
                            <ul className="nav tm-paging-links">
                                <li className="nav-item active">
                                    <a
                                        href="#"
                                        className="nav-link tm-paging-link"
                                    >
                                        1
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className="nav-link tm-paging-link"
                                    >
                                        2
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className="nav-link tm-paging-link"
                                    >
                                        3
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className="nav-link tm-paging-link"
                                    >
                                        4
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        href="#"
                                        className="nav-link tm-paging-link"
                                    >
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                    </main>
                </div>
            </div>

            <Footer />
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default Blog;
