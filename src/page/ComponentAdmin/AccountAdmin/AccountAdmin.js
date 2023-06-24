import "./AccountAdmin.css";
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


function AccountAdmin() {
    const [keyword, setKeyword] = useState("");
    const [accounts, setAccounts] = useState([]);
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
        getAccounts();
    }, [state]);

    const getAccounts = () => {
        setIsLoading(true);
        AccountService.getAllAccount()
            .then((response) => {
                const dataSources = response.map(
                    (item, index) => {
                        var birthDate = item.dateOfBirth.split("T")[0];
                        return {
                            key: index + 1,
                            id: item.id,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            role: item.role,
                            dateOfBirth: birthDate,
                            emailAddress: item.emailAddress,
                        };
                    }
                );

                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.role > b.role ? 1 : -1
                );

                setAccounts(dataSourcesSorted);
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

    const handleConfirmUpdateAccount = (allValue, isChangeImage) => {
        var formData = new FormData();
        formData.append("firstName", allValue.firstName);
        formData.append("lastName", allValue.lastName);
        formData.append("emailAddress", allValue.emailAddress);
        formData.append("dateOfBirth", allValue.dateOfBirth);
        formData.append("gender", allValue.gender);
        formData.append("phone", allValue.phone);
        if (isChangeImage) {
            formData.append("image", allValue.image);
        }

        if (allValue.role === "EMPLOYEE") {
            AccountService.updateAccountsEmployeeById(id, formData)
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
        } else if (allValue.role === "CUSTOMER") {
            AccountService.updateAccountsCustomerById(id, formData)
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
        } else if (allValue.role === "ADMIN") {
            AccountService.updateAccountsAdminById(id, formData)
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
        }
    };

    //Componet Update Account
    const DivUpdateAccount = (
        <ModalInput
            show={updateState}
            handleInputCustom={handleInputCustom}
            content={
                <UpdateAccount
                    AccountId={id}
                    handleInputCustom={handleInputCustom}
                    handleConfirmUpdateAccount={handleConfirmUpdateAccount}
                    errorServer={errorServer}
                    // dropValue={dropValue}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    function PaginatedItems({ itemsPerPage, searchAccount }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchAccount.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchAccount.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchAccount.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TableAccounts accounts={currentItems} />
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
        setIsReset(false);
    };

    const handleDelete = () => {
        if (role === "CUSTOMER")
            AccountService.deleteAccountCustomersById(id).then((res) => {
                if (res) {
                    setState(!state);
                }
            });
        else if (role === "EMPLOYEE")
            AccountService.deleteAccountEmployeesById(id).then((res) => {
                if (res) {
                    setState(!state);
                }
            });
        else if (role === "ADMIN")
            AccountService.deleteAccountAdminById(id).then((res) => {
                if (res) {
                    setState(!state);
                }
            });
        setIsDelete(false);
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

    //Handle reset password
    const handleReset = () => {
        AccountService.resetPasswordToDefaultById(id).then((res) => {
            if (res === true) {
                setState(!state);
            }
        });
        setIsReset(false);
    };

    const ConfirmReset = (
        <ModalCustom
            show={isReset}
            content={
                <ConfirmAlert
                    handleCloseModalCustom={handleCloseModalCustom}
                    handleDelete={handleReset}
                    title={`Do you want to reset this account password?`}
                />
            }
            handleCloseModalCustom={handleCloseModalCustom}
        />
    );

    //Handle Search
    const searchAccount = (account) => {
        return account.filter(
            (account) =>
                account.firstName
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                account.emailAddress.toLowerCase().includes(keyword.toLowerCase())
                ||
                account.lastName.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const TableAccounts = ({ accounts }) => {
        const accountItem = accounts.map((item) => (
            <tr data-key={item.id} key={item.id} role={item.role.toUpperCase()}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.emailAddress}</td>
                <td>{item.dateOfBirth}</td>
                <td>{item.role.toUpperCase()}</td>
                <td onClick={click}>
                    {/* <i className="fa-regular fa-pen-to-square btn-edit" >Edit</i>
                    <i className="fa-regular fa-trash-can btn-delete">Delete</i>
                    <i className="fa-regular fa-shield-halved btn-reset">Reset</i> */}
                    <FontAwesomeIcon className="icon fa-regular fa-pen-to-square btn-edit" icon={faPen} />
                    <FontAwesomeIcon className="icon fa-regular fa-trash-can btn-delete" icon={faTrash} />
                    <FontAwesomeIcon className="icon fa-regular fa-shield-halved btn-reset" icon={faShield} />
                </td>
            </tr>
        ));

        function click(e) {
            if (e.target.tagName === 'path') {
                const id = e.target.parentElement.parentElement.parentElement.getAttribute("data-key");
                if (e.target.parentElement.className.baseVal.includes("btn-delete")) {
                    setIsDelete(true);
                    setId(id);
                    setRole(e.target.parentElement.parentElement.parentElement.getAttribute("role"));
                } else if (e.target.parentElement.className.baseVal.includes("btn-edit")) {
                    setUpdateState(true);
                    setId(id);
                } else if (e.target.parentElement.className.baseVal.includes("btn-reset")) {
                    setIsReset(true);
                    setId(id);
                }
            }
        }

        let headerAccount;

        headerAccount = (
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Date Of Birth</th>
                <th>Role</th>
                <th>Action</th>
            </tr>
        );

        return (
            <table id="table">
                <thead>{headerAccount}</thead>
                <tbody>{accountItem}</tbody>
            </table>
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const handleConfirmAddAdminAccount = (allValue) => {
        var formData = {
            firstName: allValue.firstName,
            lastName: allValue.lastName,
            emailAddress: allValue.emailAddress,
            dateOfBirth: allValue.dateOfBirth + "T00:00:00.000Z",
            gender: allValue.gender,
            phone: allValue.phone,
            password: allValue.password,
        };
        // if (!!allValue.image)
        //     formData.append(
        //         "image",
        //         allValue.image,
        //         allValue.image.name
        //     );
        AccountService.addAdminAccount(formData)
            .then((res) => {
                if (res) {
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

    //Component Add Admin Account (Form)
    const DivAddAdminAccount = (
        <ModalInput
            show={addState}
            handleInputCustom={handleInputCustom}
            content={
                <AddAdminAccount
                    handleInputCustom={handleInputCustom}
                    handleConfirmAddAdminAccount={handleConfirmAddAdminAccount}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleAddAdminAccount = () => {
        setAddState(true);
        setErrorServer(false);
        setErrorMessage("");
    };

    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>Manage Account</h3>
                </div>
                <div className="right-header">
                    <button className="btn-account" onClick={handleAddAdminAccount}>
                        Add Admin Account
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
                searchAccount={searchAccount(accounts)}
            />
            {isDelete ? ConfirmDelete : null}
            {isReset ? ConfirmReset : null}
            {addState ? DivAddAdminAccount : null}
            {updateState ? DivUpdateAccount : null}
            <Loading isLoading={isLoading} />
        </div>
    );
}

export default AccountAdmin;
