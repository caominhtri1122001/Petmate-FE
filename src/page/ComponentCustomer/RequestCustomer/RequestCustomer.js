import React, { useEffect, useState } from "react";
import "./RequestCustomer.css";
import CustomerService from "../../../config/service/CustomerService";
import Logo from "../../../assets/images/Logo.png";

const RequestCustomer = () => {
    const [requests, setRequests] = useState([]);

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
    }, []);

    const TableRequests = ({ requests }) => {
        const requestItem = requests.map((item) => (
            <tr data-key={item.id} key={item.id}>
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
                <td>{item.servicePrice}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td>{item.status ? "Accept" : "Pending"}</td>
            </tr>
        ));
        let headerRequest;

        headerRequest = (
            <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Pet's name</th>
                <th>Service's name</th>
                <th>Price</th>
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

    return (
        <div>
            <div className="div-container">
                <div className="main-content">
                    <div className="main-container">
                        <header>
                            <div>
                                <h3>Manage Requests</h3>
                            </div>
                        </header>
                        <div className="table-content">
                            <TableRequests requests={requests} />
                        </div>
                    </div>
                    <footer></footer>
                </div>
            </div>
        </div>
    );
};

export default RequestCustomer;
