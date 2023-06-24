import React, { useEffect, useState } from "react";
import "./RequestCustomer.css";
import CustomerService from "../../../config/service/CustomerService";
import Logo from "../../../assets/images/Logo.png";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import SitterService from "../../../config/service/SitterService";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";

const RequestCustomer = () => {
    const [requests, setRequests] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [id, setId] = useState("");
    const [isCancel, setIsCancel] = useState(false);
    const [state, setState] = useState(false);

    useEffect(() => {
        CustomerService.getAllRequestByUser(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    requestId: item.requestId,
                    userId: item.userId,
                    sitterId: item.sitterId,
                    sitterName: item.sitterName,
                    sitterAvatar: item.sitterAvatar ? item.sitterAvatar : Logo,
                    petId: item.petId,
                    petName: item.petName,
                    serviceId: item.serviceId,
                    serviceName: item.serviceName,
                    servicePrice: item.price,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    startTime: item.startTime,
                    endTime: item.endTime,
                    address: item.address,
                    message: item.message,
                    status: item.status,
                };
            });
            setRequests(dataSources);
        });
    }, [state]);

    const TableRequests = ({ requests }) => {
        const requestItem = requests.map((item) => (
            <tr data-key={item.requestId} key={item.key}>
                <td>
                    <img
                        className="sitter-avatar"
                        src={item.sitterAvatar}
                        alt="avatar"
                    />
                </td>
                <td>{item.sitterName}</td>
                <td>{item.petName}</td>
                <td>{item.serviceName}</td>
                <td>{item.servicePrice + "$"}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.status}</td>
                {item.status === "PENDING" ? (
                    <td onClick={click}>
                        <FontAwesomeIcon
                            className="fa-solid fa-trash btn-cancel-request"
                            style={{ color: "#ff0000", cursor: "pointer" }}
                            icon={faTrash}
                        />
                    </td>
                ) : null}
            </tr>
        ));

        function click(e) {
            const id =
                e.target.parentElement.parentElement.parentElement.getAttribute(
                    "data-key"
                );
            setId(id);
            setIsCancel(true);
        }
        let headerRequest;

        headerRequest = (
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Pet's name</th>
                <th>Service's name</th>
                <th>Price($)</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Status</th>
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

    const searchRequest = (requests) => {
        return requests.filter(
            (request) =>
                request.petName.toLowerCase().includes(keyword.toLowerCase()) ||
                request.serviceName
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                request.servicePrice
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                request.status.toLowerCase().includes(keyword.toLowerCase()) ||
                request.startDate
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                request.endDate.toLowerCase().includes(keyword.toLowerCase()) ||
                request.startTime
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                request.endTime.toLowerCase().includes(keyword.toLowerCase()) ||
                request.sitterName.toLowerCase().includes(keyword.toLowerCase())
        );
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
    }

    const handleCloseModalCustom = () => {
        setIsCancel(false);
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const handleCancel = () => {
        CustomerService.cancelRequest(id).then((res) => {
            if (res === true) {
                setState(!state);
            } else {
                alert(
                    "You cannot cancel the request before 2 hours prior to the start time!!"
                );
            }
        });
        setIsCancel(false);
    };

    const ConfirmCancel = (
        <ModalCustom
            show={isCancel}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleCancel}
                    title={`Do you want to cancel this request?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    return (
        <div>
            <div className="div-container" style={{ height: "auto" }}>
                <div className="main-content" style={{ height: "auto" }}>
                    <div className="main-container" style={{ height: "auto" }}>
                        <header>
                            <div>
                                <h3>Manage Requests</h3>
                            </div>
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
                        </header>
                        <PaginatedItems
                            itemsPerPage={6}
                            searchRequest={searchRequest(requests)}
                        />
                    </div>
                    <footer></footer>
                </div>
            </div>
            {isCancel ? ConfirmCancel : null}
        </div>
    );
};

export default RequestCustomer;
