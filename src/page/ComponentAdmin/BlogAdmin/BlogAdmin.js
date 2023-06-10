import React, { useState, useRef } from "react";
import "./BlogAdmin.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../../config/service/AdminService";
import JoditEditor from "jodit-react";

const BlogAdmin = () => {
    const coverImageUrl = "http://myfbcovers.com/uploads/covers/2011/11/08/9d070f30ec42012e1d507f93b3e77c75/watermarked_cover.png";
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(coverImageUrl);
    const [fileImage, setFileImage] = useState('');
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [title, setTitle] = useState('');
    const editor = useRef(null);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // const contentted = '<p><img src="https://images.unsplash.com/photo-1528465424850-54d22f092f9d?ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y292ZXIlMjBwaG90b3xlbnwwfHwwfHx8MA%3D%3D&amp;auto=format&amp;fit=crop&amp;w=500&amp;q=60" alt="" width="300px" style="float: left;"></p><p><br></p><p><br></p><p><br></p><p><br></p><p><br></p><p style="text-align: left;">Ôi không,&nbsp;<em>huhu</em></p>';

    const [blogError, setBlogError] = useState({
        tags: "",
        title: "",
        content: "",
        fileImage: "",
    });

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && inputValue) {
            const newTags = [...tags, inputValue];
            setTags(newTags);
            setInputValue('');
        } else if (event.key === 'Backspace' && !inputValue && tags.length) {
            const newTags = tags.slice(0, -1);
            setTags(newTags);
        }
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTagRemove = (tag) => {
        const newTags = tags.filter((item) => item !== tag);
        setTags(newTags);
    };

    const handleSubmit = () => {
        let titleError = false;
        let contentError = false;
        let tagsError = false;
        let fileImageError = false;
        let check = false;

        if (!title) {
            titleError = true;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');

        let containsImage = false;
        let containsContent = false;

        doc.querySelectorAll('img').forEach((img) => {
            containsImage = true;
        });

        doc.querySelectorAll(':not(img)').forEach((el) => {
            if (el.textContent.trim() !== '') {
                containsContent = true;
            }
        });

        if (!containsImage && !containsContent) {
            contentError = true;
        }

        if (tags.length == 0 || tags.length > 5) {
            tagsError = true;
        }

        if (!!fileImage) {
            let imageList = fileImage.name.split(".");
            if (
                imageList[imageList.length - 1] !== "png" &&
                imageList[imageList.length - 1] !== "jpg"
            ) {
                fileImageError = true;
                check = true;
            } else fileImageError = false;
        }

        setBlogError({
            title: titleError,
            tags: tagsError,
            fileImage: fileImageError,
            content: contentError,
        })
        console.log(blogError);

        if (!check) {
            console.log(true);
            var formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("author", JSON.parse(localStorage.getItem("@Login")).userId);
            formData.append("tags", tags);
            if (fileImage !== '') {
                formData.append("image", fileImage);
            }
            AdminService.createBlog(formData)
                .then((res) => {
                    if (res.title) {
                        setCoverImage(coverImageUrl);
                        setTitle('');
                        setContent('');
                        setTags([]);
                        setFileImage('');
                        setErrorServer(false);
                        setErrorMessage("");
                    } else {
                        setErrorServer(true);
                        setErrorMessage(res.message);
                    }
                })
                .catch((error) => console.log("error", error));
        }
    };

    const changeHandlerCoverIMG = (e) => {
        setFileImage(e.target.files[0]);
        try {
            setCoverImage(URL.createObjectURL(e.target.files[0]));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="write">
            {/* <div dangerouslySetInnerHTML={{ __html: contentted }} /> */}
            <h1>Create new blog</h1>
            <label
                className={
                    "error" +
                    (errorServer ? " error-show" : " error-hidden")
                }
            >
                {errorMessage}
            </label>
            <label
                className={
                    "error" +
                    (blogError.fileImage
                        ? " error-show"
                        : " error-hidden")
                }
            >
                The selected file is not valid
            </label>
            <label
                className={
                    "error" +
                    (blogError.title
                        ? " error-show"
                        : " error-hidden")
                }
            >
                Please input title
            </label>
            <label
                className={
                    "error" +
                    (blogError.content
                        ? " error-show"
                        : " error-hidden")
                }
            >
                Please input content
            </label>
            <label
                className={
                    "error" +
                    (blogError.tags
                        ? " error-show"
                        : " error-hidden")
                }
            >
                Please input at least 1 tag and max is 5
            </label>
            <br></br>
            <br></br>
            <img
                className="writeImg"
                src={coverImage}
                alt="cover-image"
            />
            <div className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <FontAwesomeIcon
                            className="icon fa-regular fa-plus writeIcon"
                            icon={faPlus}
                        />
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        style={{ display: "none" }}
                        onChange={changeHandlerCoverIMG}
                    />

                    <input
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        autoFocus={true}
                    />
                </div>
                <div className="writeFormGroup">
                    <div className="writeTag">
                        <div className="tag-list">
                            {tags.map((tag, index) => (
                                <div className="tag" key={index}>
                                    {tag}
                                    <button className="remove-tag" onClick={() => handleTagRemove(tag)}>
                                        <FontAwesomeIcon className="fa-solid fa-circle-xmark" icon={faCircleXmark} style={{ color: "#ec0909" }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <input
                            type="text"
                            className="tag-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter tags"
                        />
                    </div>
                </div>

                <div className="writeFormGroup">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        tabIndex={1}
                        onChange={newContent => setContent(newContent)}
                    />
                </div>

            </div>
            <button onClick={handleSubmit} type="submit" className="submit-button">
                Publish
            </button>
        </div>
    );
};

export default BlogAdmin;
