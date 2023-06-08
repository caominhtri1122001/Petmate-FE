import "./ServiceAdmin.css";
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


function ServiceAdmin() {
    const [keyword, setKeyword] = useState("");
    const [services, setServices] = useState([]);
    const [state, setState] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [id, setId] = useState("");
    const [role, setRole] = useState("");
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isReset, setIsReset] = useState(false);
    const [addState, setAddState] = useState(false);

    useEffect(() => {
        getServices();
    }, [state]);

    const getServices = () => {
        setIsLoading(true);
        AdminService.getAllService()
            .then((response) => {
                const dataSources = response.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item.id,
                            name: item.name,
                        };
                    }
                );

                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.key > b.key ? 1 : -1
                );

                setServices(dataSourcesSorted);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleInputCustom = () => {
        setAddState(false);
        setUpdateState(false);
        setErrorServer(false);
        setErrorMessage("");
    };

    const handleConfirmUpdateService = (allValue) => {
        var formData = new FormData();
        formData.append("name", allValue.name);

        AdminService.updateServiceById(id, formData)
            .then((res) => {
                if (res == true) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setUpdateState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateState(true);
                }
            })
            .catch((error) => console.log("error", error));

    };

    //Componet Update Account
    const DivUpdateService = (
        <ModalInput
            show={updateState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateService
                    id={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateService={handleConfirmUpdateService}
                    errorServer={errorServer}
                    // dropValue={dropValue}
                    errorMessage={errorMessage}
                />
            }
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
    };

    // const handleCloseModalCustom = () => {
    //     setIsDelete(false);
    //     setIsReset(false);
    // };

    // const handleDelete = () => {
    //     if (role === "CUSTOMER")
    //         AccountService.deleteAccountCustomersById(id).then((res) => {
    //             if (res) {
    //                 setState(!state);
    //             }
    //         });
    //     else if (role === "EMPLOYEE")
    //         AccountService.deleteAccountEmployeesById(id).then((res) => {
    //             if (res) {
    //                 setState(!state);
    //             }
    //         });
    //     else if (role === "ADMIN")
    //         AccountService.deleteAccountAdminById(id).then((res) => {
    //             if (res) {
    //                 setState(!state);
    //             }
    //         });
    //     setIsDelete(false);
    // };

    // const ConfirmDelete = (
    //     <ModalCustom
    //         show={isDelete}
    //         content={
    //             <ConfirmAlert
    //                 handleCloseModalCustom={handleCloseModalCustom}
    //                 handleDelete={handleDelete}
    //                 title={`Do you want to delete account`}
    //             />
    //         }
    //         handleCloseModalCustom={handleCloseModalCustom}
    //     />
    // );

    //Handle reset password
    // const handleReset = () => {
    //     AccountService.resetPasswordToDefaultById(id).then((res) => {
    //         if (res === true) {
    //             setState(!state);
    //         }
    //     });
    //     setIsReset(false);
    // };

    // const ConfirmReset = (
    //     <ModalCustom
    //         show={isReset}
    //         content={
    //             <ConfirmAlert
    //                 handleCloseModalCustom={handleCloseModalCustom}
    //                 handleDelete={handleReset}
    //                 title={`Do you want to reset this account password?`}
    //             />
    //         }
    //         handleCloseModalCustom={handleCloseModalCustom}
    //     />
    // );

    //Handle Search
    const searchService = (services) => {
        return services.filter(
            (service) =>
                service.name
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
        );
    };

    const TableServices = ({ services }) => {
        const serviceItem = services.map((item) => (
            <tr data-key={item.id} key={item.id} >
                <td>{item.key}</td>
                <td>{item.name}</td>
                <td onClick={click}>
                    <FontAwesomeIcon className="icon fa-regular fa-pen-to-square btn-edit" icon={faPen} />
                </td>
            </tr>
        ));

        function click(e) {
            if (e.target.tagName === 'path') {
                const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-key");
                setUpdateState(true);
                setId(id);
            }
        }

        let headerService;

        headerService = (
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
        );

        return (
            <table id="table">
                <thead>{headerService}</thead>
                <tbody>{serviceItem}</tbody>
            </table>
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const handleConfirmAddService = (allValue) => {
        var formData = {
            name: allValue.name,
        };
        AdminService.createService(formData)
            .then((res) => {
                if (res.id) {
                    setState(!state);
                    setErrorServer(false);
                    setErrorMessage("");
                    setAddState(false);
                } else {
                    setErrorServer(true);
                    setErrorMessage(res.message);
                    setUpdateState(true);
                }
            })
            .catch((error) => console.log("error", error));
    };

    // Component Add Service (Form)
    const DivAddServiceAccount = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddService
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddService={handleConfirmAddService}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleAddService = () => {
        setAddState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Service</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddService}>
                        Add Service Account
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
            {/* <div className="table-content"> */}

            <PaginatedItems
                itemsPerPage={6}
                searchService={searchService(services)}
            />
            {/* {isDelete ? ConfirmDelete : null} */}
            {/* {isReset ? ConfirmReset : null} */}
            {addState ? DivAddServiceAccount : null}
            {updateState ? DivUpdateService : null}
            <Loading isLoading={isLoading} />
        </div>
    );
}

export default ServiceAdmin;
