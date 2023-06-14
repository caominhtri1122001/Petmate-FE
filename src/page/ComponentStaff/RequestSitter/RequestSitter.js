import React, { useEffect, useState } from "react";
import "./RequestSitter.css";
import SitterService from "../../../config/service/SitterService";
import Logo from "../../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleInfo,
    faPaw,
    faTrash,
    faSquareCheck,
    faClipboardCheck,
    faBan,
    faHeart,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import ViewPet from "../../../lib/ModalInput/ViewPet/ViewPet";
import ViewDetailRequest from "../../../lib/ModalInput/ViewDetailRequest/ViewDetailRequest";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ReactPaginate from "react-paginate";

const RequestSitter = () => {
    const [keyword, setKeyword] = useState("");
    const [state, setState] = useState(false);
    const [requests, setRequests] = useState([]);
    const [sitterId, setSitterId] = useState("");
    const [id, setId] = useState("");
    const [petId, setPetId] = useState("");
    const [viewDetail, setViewDetail] = useState(false);
    const [viewPet, setViewPet] = useState(false);
    const [isCancel, setIsCancel] = useState(false);
    const [isAccept, setIsAccept] = useState(false);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        SitterService.getSitterIdByUserId(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            if (res.sitterId) {
                SitterService.getAllRequestBySitter(res.sitterId).then(
                    (res) => {
                        const dataSources = res.map((item, index) => {
                            return {
                                key: index + 1,
                                requestId: item.requestId,
                                userId: item.userId,
                                customerName: item.customerName,
                                customerImage: item.customerImage
                                    ? item.customerImage
                                    : Logo,
                                sitterId: item.sitterId,
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
                    }
                );
                setSitterId(res.sitterId);
            }
        });
    }, [state]);

    const TableRequests = ({ requests }) => {
        const requestItem = requests.map((item) => (
            <tr data-key={item.requestId} key={item.key} data-pet={item.petId}>
                <td>
                    <img
                        className="sitter-avatar"
                        src={item.customerImage}
                        alt="avatar"
                    />
                </td>
                <td>{item.customerName}</td>
                <td>{item.petName}</td>
                <td>{item.serviceName}</td>
                <td>{item.servicePrice}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.status}</td>
                <td onClick={click}>
                    <FontAwesomeIcon
                        className="fa-solid fa-circle-info btn-detail"
                        style={{ color: "#4404f6", cursor: "pointer" }}
                        icon={faCircleInfo}
                    />
                    <FontAwesomeIcon
                        className="fa-solid fa-paw btn-pet"
                        style={{ color: "#000000", cursor: "pointer" }}
                        icon={faPaw}
                    />
                </td>
                {item.status === "PENDING" ? (
                    <td onClick={click}>
                        <FontAwesomeIcon
                            className="fa-solid fa-square-check btn-accept"
                            style={{ color: "#0dbf43", cursor: "pointer" }}
                            icon={faSquareCheck}
                        />
                        <FontAwesomeIcon
                            className="fa-solid fa-trash btn-cancel-request"
                            style={{ color: "#ff0000", cursor: "pointer" }}
                            icon={faTrash}
                        />
                    </td>
                ) : item.status === "ACCEPT" ? (
                    <td onClick={click}>
                        <FontAwesomeIcon
                            className="fa-solid fa-clip-board-check btn-done"
                            style={{ cursor: "pointer" }}
                            icon={faClipboardCheck}
                        />
                    </td>
                ) : item.status === "CANCEL" ? (
                    <td>
                        <FontAwesomeIcon
                            className="fa-solid fa-ban"
                            style={{ color: "#ff0000", cursor: "pointer" }}
                            icon={faBan}
                        />
                    </td>
                ) : (
                    <td>
                        <FontAwesomeIcon
                            className="fa-solid fa-heart"
                            style={{ color: "#e70d0d", cursor: "pointer" }}
                            icon={faHeart}
                        />
                    </td>
                )}
            </tr>
        ));

        function click(e) {
            if (e.target.tagName === "path") {
                const id =
                    e.target.parentElement.parentElement.parentElement.getAttribute(
                        "data-key"
                    );
                const petId =
                    e.target.parentElement.parentElement.parentElement.getAttribute(
                        "data-pet"
                    );
                if (
                    e.target.parentElement.className.baseVal.includes(
                        "btn-detail"
                    )
                ) {
                    setViewDetail(true);
                    setId(id);
                } else if (
                    e.target.parentElement.className.baseVal.includes("btn-pet")
                ) {
                    setViewPet(true);
                    setPetId(petId);
                } else if (
                    e.target.parentElement.className.baseVal.includes(
                        "btn-cancel-request"
                    )
                ) {
                    setIsCancel(true);
                    setId(id);
                } else if (
                    e.target.parentElement.className.baseVal.includes(
                        "btn-accept"
                    )
                ) {
                    setIsAccept(true);
                    setId(id);
                } else if (
                    e.target.parentElement.className.baseVal.includes(
                        "btn-done"
                    )
                ) {
                    setIsDone(true);
                    setId(id);
                }
            }
        }

        let headerRequest;

        headerRequest = (
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Pet's name</th>
                <th>Service's name</th>
                <th>Price ($)</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Info</th>
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

    const handleInputCustom = () => {
        setViewPet(false);
        setViewDetail(false);
    };

    const handleCloseModalCustom = () => {
        setIsAccept(false);
        setIsCancel(false);
        setIsDone(false);
    };

    const DivViewPet = (
        <ModalInput
            show={viewPet}
            handleInputCustom={handleInputCustom}
            content={
                <ViewPet petId={petId} handleInputCustom={handleInputCustom} />
            }
        />
    );

    const DivViewRequest = (
        <ModalInput
            show={viewDetail}
            handleInputCustom={handleInputCustom}
            content={
                <ViewDetailRequest
                    viewDetail={viewDetail}
                    id={id}
                    handleInputCustom={handleInputCustom}
                />
            }
        />
    );

    const handleAccept = () => {
        SitterService.acceptRequest(id).then((res) => {
            if (res) {
                setState(!state);
            }
        });
        setIsAccept(false);
    };

    const handleDecline = () => {
        SitterService.declineRequest(id).then((res) => {
            if (res) {
                setState(!state);
            }
        });
        setIsCancel(false);
    };

    const handleDone = () => {
        SitterService.doneRequest(id).then((res) => {
            if (res) {
                setState(!state);
            }
        });
        setIsDone(false);
    };

    const ConfirmAccept = (
        <ModalCustom
            show={isAccept}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleAccept}
                    title={`Do you want to accept this request?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const ConfirmDecline = (
        <ModalCustom
            show={isCancel}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDecline}
                    title={`Do you want to decline this request?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const ConfirmDone = (
        <ModalCustom
            show={isDone}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDone}
                    title={`Have you done this request?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

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

    const searchRequest = (requests) => {
        return requests.filter(
            (request) =>
                request.petName
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                request.serviceName.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.servicePrice.toString().toLowerCase().includes(keyword.toLowerCase())
                ||
                request.status.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.startDate.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.endDate.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.startTime.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.endTime.toLowerCase().includes(keyword.toLowerCase())
                ||
                request.customerName.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

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
                        {/* <div className="table-content">
                            <TableRequests requests={requests} />
                        </div> */}
                        <PaginatedItems
                            itemsPerPage={6}
                            searchRequest={searchRequest(requests)}
                        />
                    </div>
                    <footer></footer>
                </div>
            </div>
            {viewPet ? DivViewPet : null}
            {viewDetail ? DivViewRequest : null}
            {isAccept ? ConfirmAccept : null}
            {isCancel ? ConfirmDecline : null}
            {isDone ? ConfirmDone : null}
        </div>
    );
};

export default RequestSitter;
