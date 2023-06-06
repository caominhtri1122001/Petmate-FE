import React, { useEffect, useState } from "react";
import "./ServiceSitter.css";
import SitterService from "../../../config/service/SitterService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import AddServiceSitter from "../../../lib/ModalInput/AddServiceSitter/AddServiceSitter";

const ServiceSitter = () => {
    const [services, setServices] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [state, setState] = useState(false);
    const [id, setId] = useState("");
    const [sitterId, setSitterId] = useState("");
    const [updateState, setUpdateState] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [addState, setAddState] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        SitterService.getSitterIdByUserId(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            if (res.sitterId) {
                setSitterId(res.sitterId);
            }
        });
        SitterService.getServiceFromSitter(
            JSON.parse(localStorage.getItem("@Login")).userId
        ).then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    id: item.id,
                    name: item.name,
                    price: item.price,
                };
            });
            setServices(dataSources);
        });
    }, [state]);

    const TableServices = ({ services }) => {
        const serviceItem = services.map((item) => (
            <tr data-key={item.id} key={item.key}>
                <td>{item.key}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td onClick={click}>
                    <FontAwesomeIcon
                        className="icon fa-regular fa-pen-to-square btn-edit"
                        icon={faPenToSquare}
                    />
                    <FontAwesomeIcon
                        className="icon fa-regular fa-trash-can btn-delete"
                        icon={faTrash}
                    />
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
                }
            }
        }

        let headerRequest;

        headerRequest = (
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Price ($)</th>
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
            sitterId: allValue.sitterId,
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
                                        className="input-search"
                                        type="text"
                                        placeholder="Search..."
                                    ></input>
                                </div>
                            </div>
                        </header>
                        <div className="table-content">
                            <TableServices services={services} />
                        </div>
                    </div>
                    <footer></footer>
                </div>
            </div>
            {addState ? DivAddServiceSitter : null}
        </div>
    );
};

export default ServiceSitter;
