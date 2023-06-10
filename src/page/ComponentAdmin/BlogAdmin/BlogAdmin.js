import React, { useState } from "react";
import "./BlogAdmin.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../../config/service/AdminService";

const BlogAdmin = () => {
    const coverImageUrl = "http://myfbcovers.com/uploads/covers/2011/11/08/9d070f30ec42012e1d507f93b3e77c75/watermarked_cover.png";
    const [content, setContent] = useState("");
    const [coverImage, setCoverImage] = useState(coverImageUrl);
    const [fileImage, setFileImage] = useState('');
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [title, setTitle] = useState('');
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // const contentted = "<p><strong>Heeloo</strong></p><p><i><strong>dasddasads</strong></i></p>";

    const handleChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    }

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
                    <CKEditor
                        // className="ckEditorWrapper"
                        editor={ClassicEditor}
                        data={content}
                        onChange={handleChange}
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
