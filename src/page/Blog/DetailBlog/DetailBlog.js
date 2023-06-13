import React, { useState, useEffect } from "react";
import Header from "../../../common/Header/Header";
import Footer from "../../../common/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./DetailBlog.css";
import BlogService from "../../../config/service/BlogService";
import Logo from "../../../assets/images/Logo.png";
import AuthenticationService from "../../../config/service/AuthenticationService";
import Login from "../../../common/Login/Login";

const DetailBlog = (props) => {
    const { id } = props.match.params;
    const [state, setState] = useState(false);
    const [blogInfo, setBlogInfo] = useState({
        postId: "",
        title: "",
        content: "",
        createdAt: "",
        UpdatedAt: "",
        image: "",
        tags: "",
        views: "",
        likes: "",
        comments: "",
        userId: "",
        userAvatar: "",
        name: "",
        mail: "",
        phone: "",
    });
    const [tags, setTags] = useState([]);
    const [text, setText] = useState("");
    const [parentCommentId, setParentCommentId] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLogin, setIsLogin] = useState(AuthenticationService.isLogin);
    const [isShowLogin, setIsShowLogin] = useState(false);

    useEffect(() => {
        BlogService.getBlogById(id).then((res) => {
            if (res.postId) {
                setBlogInfo({
                    postId: res.postId,
                    title: res.title,
                    content: res.content,
                    createdAt: res.createdAt.split("T")[0],
                    updatedAt: res.updatedAt,
                    image: res.image,
                    tags: res.tags,
                    views: res.views,
                    comments: res.comments,
                    likes: res.likes,
                    userId: res.userId,
                    userAvatar: res.userImage ? res.userImage : Logo,
                    name: res.name,
                    mail: res.mail,
                    phone: res.phone,
                });
                setTags(res.tags);
            }
        });
        BlogService.getAllComment(id).then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    commentId: item.commentId,
                    postId: item.postId,
                    userId: item.userId,
                    name: item.name,
                    avatar: item.avatar === null ? Logo : item.avatar,
                    content: item.content,
                    parentCommentId: item.commentId,
                    createdAt: item.createdAt.split("T")[0],
                };
            });
            console.log(dataSources);
            setComments(dataSources);
        });
    }, [state]);

    const HandleCloseLogin = () => {
        setIsShowLogin(false);
    };

    const HandleLoginSuccess = () => {
        setIsLogin(true);
    };

    const ViewLogin = (
        <Login
            show={isShowLogin}
            HandleCloseLogin={HandleCloseLogin}
            HandleLoginSuccess={HandleLoginSuccess}
        />
    );

    const handleComment = (e) => {
        e.preventDefault();
        if (!isLogin) {
            setIsShowLogin(true);
        } else {
            setIsShowLogin(false);
            console.log(
                JSON.parse(localStorage.getItem("@Login")).userId +
                    id +
                    text +
                    parentCommentId
            );
            BlogService.createComment({
                userId: JSON.parse(localStorage.getItem("@Login")).userId,
                postId: id,
                content: text,
                commentId: parentCommentId,
            }).then((res) => {
                console.log(res);
                if (res) {
                    setState(!state);
                }
            });
        }
    };

    return (
        <div>
            <Header />
            <div className="blog-container">
                {/* <div className="blog-header">
                    <h2>{blogInfo.title}</h2>
                </div> */}
                <div className="row">
                    <div className="leftcolumn">
                        <div className="card">
                            <h1 style={{ fontWeight: "bold" }}>
                                {blogInfo.title}
                            </h1>
                            <div className="blog-info">
                                <h4>Posted at: {blogInfo.createdAt}</h4>
                                <div className="blog-view">
                                    <h5
                                        style={{
                                            marginRight: 10,
                                        }}
                                    >
                                        Views : {blogInfo.views}
                                    </h5>
                                    <h5 style={{ marginRight: 10 }}>
                                        Likes: {blogInfo.likes}
                                    </h5>
                                    <h5 style={{ marginRight: 10 }}>
                                        Comments: {blogInfo.comments}
                                    </h5>
                                </div>
                            </div>
                            <img
                                src={blogInfo.image}
                                alt="coverImage"
                                style={{
                                    height: 400,
                                    width: "100%",
                                    borderRadius: 20,
                                }}
                            />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: blogInfo.content,
                                }}
                            ></div>
                        </div>
                        <div className="post-tags">
                            <span className="list-tag">List tags: </span>
                            {tags.map((item) => {
                                return <span className="tag">{item}</span>;
                            })}
                        </div>
                    </div>
                    <div className="rightcolumn">
                        <div className="card">
                            <h2>About the author</h2>
                            <img src={blogInfo.userAvatar} alt="avatar" />
                            <h4>My name is {blogInfo.name}</h4>
                            <h4>Mail : {blogInfo.mail}</h4>
                        </div>
                        <div className="card">
                            <h3>Related Post</h3>
                            <div className="fakeimg">Image</div>
                            <div className="fakeimg">Image</div>
                            <div className="fakeimg">Image</div>
                        </div>
                        <div className="card-contact">
                            <h3>Follow Me</h3>
                            <FontAwesomeIcon
                                className="fa-brands fa-facebook"
                                icon={faFacebook}
                            />
                            <FontAwesomeIcon
                                className="fa-brands fa-youtube"
                                icon={faYoutube}
                            />
                            <FontAwesomeIcon
                                className="fa-brands fa-instagram"
                                icon={faInstagram}
                            />
                            <FontAwesomeIcon
                                className="fa-brands fa-twitter"
                                icon={faTwitter}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="comments">
                <h3 className="comments-title">Comments</h3>
                <div className="comment-form-title">Write comment</div>
                <form onSubmit={handleComment}>
                    <textarea
                        className="comment-form-textarea"
                        placeholder="Tell me what you think"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        style={{
                            display: "flex",
                            padding: "10px 30px",
                            marginLeft: 200,
                        }}
                        className="comment-form-button"
                    >
                        Send
                    </button>
                </form>
                <div className="comments-container">
                    {comments.map((item) => {
                        return (
                            <div className="comment">
                                <div className="comment-image-container">
                                    <img src={item.avatar} alt="avatar" />
                                </div>
                                <div className="comment-right-part">
                                    <div className="comment-content">
                                        <div className="comment-author">
                                            {item.name}
                                        </div>
                                        <span>{item.createdAt}</span>
                                    </div>
                                    <div className="comment-text">
                                        {item.content}
                                    </div>
                                    <div className="comment-actions">
                                        <div className="comment-action">
                                            Reply
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <Footer />
            <div>{isShowLogin ? ViewLogin : null}</div>
        </div>
    );
};

export default DetailBlog;
