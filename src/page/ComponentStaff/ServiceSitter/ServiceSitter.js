import React, { useEffect, useState } from "react";
import "./ServiceSitter.css";
import SitterService from "../../../config/service/SitterService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowsRotate,
    faMagnifyingGlass,
    faPenToSquare,
    faTrash,
    faCircleXmark,
    faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddServiceSitter from "../../../lib/ModalInput/AddServiceSitter/AddServiceSitter";
import UpdateServiceSitter from "../../../lib/ModalInput/UpdateServiceSitter/UpdateServiceSitter";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ReactPaginate from "react-paginate";
import Loading from "../../../lib/Loading/Loading";

const ServiceSitter = () => {
    const [services, setServices] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [state, setState] = useState(false);
    const [id, setId] = useState("");
    const [sitterId, setSitterId] = useState("");
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isEnable, setIsEnable] = useState(false);
    const [addState, setAddState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        SitterService.getSitterIdByUserId(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            if (res.sitterId) {
                setSitterId(res.sitterId);
                SitterService.getServiceFromSitter(
                    JSON.parse(localStorage.getItem("@Login")).userId
                ).then((res) => {
                    const dataSources = res.map((item, index) => {
                        return {
                            key: index + 1,
                            id: item.id,
                            name: item.name,
                            type: item.serviceType,
                            price: item.price,
                            disable: item.disable,
                        };
                    });
                    setServices(dataSources);
                    setIsLoading(false);
                });
            }
        });
    }, [state]);

    const TableServices = ({ services }) => {
        const serviceItem = services.map((item) => (
            <tr data-key={item.id} key={item.key}>
                <td>{item.key}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.type}</td>
                <td>
                    {item.disable ? (
                        <FontAwesomeIcon
                            className="fa-solid fa-x"
                            style={{ color: "#e70808" }}
                            icon={faCircleXmark}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="fa-solid fa-circle-check"
                            style={{ color: "#76df30" }}
                            icon={faCircleCheck}
                        />
                    )}
                </td>
                <td onClick={click}>
                    <FontAwesomeIcon
                        className="icon fa-regular fa-pen-to-square btn-edit"
                        icon={faPenToSquare}
                    />
                    {item.disable ? (
                        <FontAwesomeIcon
                            className="icon fa-regular fa-trash-can btn-arrow-rotate"
                            icon={faArrowsRotate}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="icon fa-regular fa-trash-can btn-delete"
                            icon={faTrash}
                        />
                    )}
                </td>
            </tr>
        ));

        function click(e) {
            if (e.target.tagName === "path") {
                const id =
                    e.target.parentElement.parentElement.parentElement.getAttribute(
                        "data-key"
                    );
                if (
                    e.target.parentElement.className.baseVal.includes(
                        "btn-delete"
                    )
                ) {
                    setIsDelete(true);
                    setId(id);
                } else if (
                    e.target.parentElement.className.baseVal.includes(
                        "btn-edit"
                    )
                ) {
                    setUpdateState(true);
                    setId(id);
                } else if (
                    e.target.parentElement.className.baseVal.includes(
                        "btn-arrow-rotate"
                    )
                ) {
                    setIsEnable(true);
                    setId(id);
                }
            }
        }

        let headerRequest;

        headerRequest = (
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Price ($)</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        );

        return (
            <table id="table">
                <thead>{headerRequest}</thead>
                <tbody>{serviceItem}</tbody>
            </table>
        );
    };

    const handleAddService = () => {
        setAddState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    const handleInputCustom = () => {
        setAddState(false);
        setUpdateState(false);
        setErrorServer(false);
        setErrorMessage("");
    };

    const handleConfirmAddService = (allValue) => {
        SitterService.createService({
            name: allValue.name,
            price: allValue.price,
            serviceType: allValue.type,
            sitterId: sitterId,
        }).then((res) => {
            if (res === true) {
                setState(!state);
                setErrorServer(false);
                setErrorMessage("");
                setAddState(false);
            } else {
                setErrorServer(true);
                setErrorMessage(res.message);
                setAddState(true);
            }
        });
    };

    const handleConfirmUpdateService = (allValue) => {
        SitterService.updateService(id, allValue.price).then((res) => {
            if (res === true) {
                setState(!state);
                setErrorServer(false);
                setErrorMessage("");
                setUpdateState(false);
            } else {
                setErrorServer(true);
                setErrorMessage(res.message);
                setUpdateState(true);
            }
        });
    };

    const DivAddServiceSitter = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddServiceSitter
                    sitterId={sitterId}
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddService={handleConfirmAddService}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivUpdateServiceSitter = (
        <ModalInput
            show={updateState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateServiceSitter
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateService={handleConfirmUpdateService}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleCloseModalCustom = () => {
        setIsEnable(false);
        setIsDelete(false);
    };

    const handleDelete = () => {
        SitterService.deleteService(id).then((res) => {
            if (res === true) {
                setState(!state);
            } else {
                setErrorMessage(res.message);
                setIsDelete(true);
            }
        });
        setIsDelete(false);
    };

    const handleEnable = () => {
        SitterService.enableService(id).then((res) => {
            if (res === true) {
                setState(!state);
            } else {
                setErrorMessage(res.message);
                setIsEnable(true);
            }
        });
        setIsEnable(false);
    };

    const ConfirmDelete = (
        <ModalCustom
            show={isDelete}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleDelete}
                    title={`Do you want to disable this service?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    const ConfirmEnable = (
        <ModalCustom
            show={isEnable}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleEnable}
                    title={`Do you want to enable this service?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    function PaginatedItems({ itemsPerPage, searchService }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchService.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchService.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchService.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableServices services={currentItems} />
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

    const searchService = (services) => {
        return services.filter(
            (service) =>
                service.name.toLowerCase().includes(keyword.toLowerCase()) ||
                service.type.toLowerCase().includes(keyword.toLowerCase()) ||
                service.price
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    return (
        <div>
            <div className="div-container">
                <div className="main-content">
                    <div className="main-container">
                        <header>
                            <div>
                                <h3>Manage services</h3>
                            </div>
                            <div className="right-header">
                                <button
                                    className="btn-account"
                                    onClick={handleAddService}
                                >
                                    Adding new service
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
                        {/* <div className="table-content">
                            <TableServices services={services} />
                        </div> */}
                        <PaginatedItems
                            itemsPerPage={6}
                            searchService={searchService(services)}
                        />
                    </div>
                    <footer></footer>
                </div>
            </div>
            {isDelete ? ConfirmDelete : null}
            {isEnable ? ConfirmEnable : null}
            {updateState ? DivUpdateServiceSitter : null}
            {addState ? DivAddServiceSitter : null}
            <Loading isLoading={isLoading} />
        </div>
    );
};

export default ServiceSitter;
