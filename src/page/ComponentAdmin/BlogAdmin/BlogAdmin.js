import React from "react";
import "./BlogAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const BlogAdmin = () => {
    return (
        <div className="write">
            <h1>Create new blog</h1>
            <br></br>
            <br></br>
            <img
                className="writeImg"
                src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
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
                    />
                    <input
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        autoFocus={true}
                    />
                </div>
                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Tell your story..."
                        type="text"
                        autoFocus={true}
                    />
                </div>
            </div>
            <button type="submit" className="submit-button">
                Publish
            </button>
        </div>
    );
};

export default BlogAdmin;
