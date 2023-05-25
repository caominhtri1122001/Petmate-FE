import "./SitterAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
    faMagnifyingGlass, faThumbsDown, faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../../config/service/AdminService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ReactPaginate from "react-paginate";
import Loading from "../../../lib/Loading/Loading";


function SitterAdmin() {
    const [keyword, setKeyword] = useState("");
    const [requests, setRequets] = useState([]);
    const [state, setState] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [id, setId] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [acceptState, setAcceptState] = useState(false);

    useEffect(() => {
        getRequests();
    }, [state]);

    const getRequests = () => {
        setIsLoading(true);
        AdminService.getSitterRequests()
            .then((response) => {
                const dataSources = response.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            userId: item.userId,
                            firstName: item.firstname,
                            lastName: item.lastName,
                            phone: item.phone,
                            emailAddress: item.emailAddress,
                            address: item.address.split(",")[0] + ", " + item.address.split(",")[3],
                            yearOfExperience: item.yearOfExperience,
                            description: item.description,
                        };
                    }
                );

                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.firstname > b.firstname ? 1 : -1
                );

                setRequets(dataSourcesSorted);

                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function PaginatedItems({ itemsPerPage, searchRequest }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchRequest.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchRequest.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchRequest.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableRequests requests={currentItems} />
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

    const handleCloseModalCustom = () => {
        setIsDelete(false);
        setAcceptState(false);
    };

    const handleDelete = () => {
        AdminService.deleteSitterRequest(id).then((res) => {
            if (res) {
                setState(!state);
            }
        });
        setIsDelete(false);
    };

    const handleAccept = () => {
        AdminService.acceptSitterRequest(id).then((res) => {
            if (res) {
                setState(!state);
            }
        });
        setAcceptState(false);
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to delete this request?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const ConfirmAccept = (
        <ModalCustom
            show={acceptState}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleAccept}
                    title={`Do you want to accept this request to become sitter?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    //Handle Search
    const searchRequest = (request) => {
        return request.filter(
            (request) =>
                request.firstName
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                request.address.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.lastName.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.phone.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.emailAddress.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const TableRequests = ({ requests }) => {
        const requestItem = requests.map((item) => (
            <tr data-key={item.userId} key={item.key}>
                <td>{item.firstName + " " + item.lastName}</td>
                <td>{item.phone}</td>
                <td>{item.emailAddress}</td>
                <td>{item.address}</td>
                <td>{item.description}</td>
                <td onClick={click}>
                    <FontAwesomeIcon className="icon fa-regular btn-accept" icon={faThumbsUp} />
                    <FontAwesomeIcon className="icon fa-regular btn-delete" icon={faThumbsDown} />
                </td>
            </tr>
        ));

        function click(e) {
            if (e.target.tagName === 'path') {
                const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-key");
                if (e.target.parentElement.className.baseVal.includes("btn-accept")) {
                    console.log(id);
                    setAcceptState(true);
                    setId(id);
                } else if (e.target.parentElement.className.baseVal.includes("btn-delete")) {
                    setIsDelete(true);
                    setId(id);
                }
            }
        }

        let headerRequest;

        headerRequest = (
            <tr>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email Address</th>
                <th>Address</th>
                <th>Description</th>
                <th>Action</th>
            </tr>
        );

        return (
            <table id="table">
                <thead>{headerRequest}</thead>
                <tbody>{requestItem}</tbody>
            </table>
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };


    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Request Become Sitter</h3>
                </div>
                <div className="right-header">
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
            {/* <div className="table-content"> */}

            <PaginatedItems
                itemsPerPage={6}
                searchRequest={searchRequest(requests)}
            />
            {isDelete ? ConfirmDelete : null}
            {acceptState ? ConfirmAccept : null}
            <Loading isLoading={isLoading} />
        </div>
    );
}

export default SitterAdmin;
