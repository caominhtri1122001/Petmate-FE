import "./ManageBlogAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import {
    faMagnifyingGlass,
    faArrowLeftLong,
    faArrowRightLong,
    faPen,
    faTrash,
    faShield,
} from "@fortawesome/free-solid-svg-icons";
import AccountService from "../../../config/service/AccountService";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import AddAdminAccount from "../../../lib/ModalInput/AddAdminAccount/AddAdminAccount";
import UpdateAccount from "../../../lib/ModalInput/UpdateAccount/UpdateAccount";
import ReactPaginate from "react-paginate";
import Loading from "../../../lib/Loading/Loading";
import AdminService from "../../../config/service/AdminService";
import AddService from "../../../lib/ModalInput/AddService/AddService";
import UpdateService from "../../../lib/ModalInput/UpdateService/UpdateService";


function ManageBlogAdmin(props) {
    const [keyword, setKeyword] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [id, setId] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        getBlogs();
    }, [state]);

    const getBlogs = () => {
        setIsLoading(true);
        AdminService.getAllBlog()
            .then((response) => {
                const dataSources = response.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item.postId,
                            title: item.title,
                            authorId: item.userId,
                            authorFullName: item.name,
                            authorEmail: item.email,
                            authorPhone: item.phone,
                        };
                    }
                );

                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.title > b.title ? 1 : -1
                );

                setBlogs(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function PaginatedItems({ itemsPerPage, searchBlog }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchBlog.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchBlog.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchBlog.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableBlogs blogs={currentItems} />
                </div>
                <footer>
                    <hr></hr>
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item mr-2 ml-2"
                        pageLinkClassName="page-link"
                        previousClassName="previous-btn page-item"
                        previousLinkClassName="page-link"
                        nextClassName="next-btn page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        hrefAllControls
                    />
                </footer>
            </>
        );
    };

    //Handle Search
    const searchBlog = (blogs) => {
        return blogs.filter(
            (blog) =>
                blog.title
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                blog.authorFullName
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                blog.authorEmail
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                blog.authorPhone
                    .toLowerCase()
                    .includes(keyword.toLowerCase())   
        );
    };

    const TableBlogs = ({ blogs }) => {
        const blogItem = blogs.map((item) => (
            <tr data-key={item.id} key={item.key} >
                <td>{item.title}</td>
                <td>{item.authorFullName}</td>
                <td>{item.authorEmail}</td>
                <td>{item.authorPhone}</td>
                <td onClick={click}>
                    <FontAwesomeIcon className="icon fa-regular fa-pen-to-square btn-edit" icon={faPen} />
                    <FontAwesomeIcon className="icon fa-regular fa-trash-can btn-delete" icon={faTrash} />
                </td>
            </tr>
        ));

        function click(e) {
            if (e.target.tagName === 'path') {
                const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-key");
                if (e.target.parentElement.className.baseVal.includes("btn-delete")) {
                    setIsDelete(true);
                    setId(id);
                } else if (e.target.parentElement.className.baseVal.includes("btn-edit")) {
                    props.history.push("/admin/blog/" + id);
                }
            }
        }

        let headerBlog;

        headerBlog = (
            <tr>
                <th>Title</th>
                <th>Author Name</th>
                <th>Author Email</th>
                <th>Author Phone</th>
                <th>Action</th>
            </tr>
        );

        return (
            <table id="table">
                <thead>{headerBlog}</thead>
                <tbody>{blogItem}</tbody>
            </table>
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const handleAddBlog = (e) => {
        props.history.push("/admin/blog");
    };

    const handleCloseModalCustom = () => {
        setIsDelete(false);
    };

    const handleDelete = () => {
        AdminService.deleteBlog(id).then((res) => {
            if (res == true) {
                setState(!state);
                setIsDelete(false);
            }
        });
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete account`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Blog</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddBlog}>
                        Add Blog Account
                    </button>
                    <div className="search-box">
                        <button className="btn-search">
                            <FontAwesomeIcon
                                className="icon-search"
                                icon={faMagnifyingGlass}
                            />
                        </button>
                        <input
                            onChange={handleChangeSearch}
                            className="input-search"
                            type="text"
                            placeholder="Search..."
                            value={keyword}
                        ></input>
                    </div>
                </div>
            </header>

            <PaginatedItems
                itemsPerPage={6}
                searchBlog={searchBlog(blogs)}
            />
            {isDelete ? ConfirmDelete : null}
            <Loading isLoading={isLoading} />
        </div>
    );
}

export default ManageBlogAdmin;
