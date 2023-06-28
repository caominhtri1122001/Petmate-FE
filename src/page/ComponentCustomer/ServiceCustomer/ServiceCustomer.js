import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "./ServiceCustomer.css";
import "leaflet/dist/leaflet.css";
import CustomerLocation from "../../../assets/images/customerLocation.png";
import Loading from "../../../lib/Loading/Loading";
import CustomerService from "../../../config/service/CustomerService";
import Logo from "../../../assets/images/Logo.png";
import ModalInput from "../../../lib/ModalInput/ModalInput";
import DetailSitter from "../../../lib/ModalInput/DetailSitter/DetailSitter";
import ContactSitter from "../../../lib/ModalInput/ContactSitter/ContactSitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLocationDot,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // size of the icon
});

const customerIcon = new Icon({
    iconUrl: CustomerLocation,
    iconSize: [38, 38],
});

const ServiceCustomer = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sitters, setSitters] = useState([]);
    const [marker, setMarker] = useState([]);
    const [contact, setContact] = useState(false);
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [id, setId] = useState("");
    const [sitterName, setSitterName] = useState("");
    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [state, setState] = useState(false);

    useEffect(() => {
        if (location === "") {
            if (navigator.geolocation) {
                const options = {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                };
                navigator.geolocation.getCurrentPosition(
                    handleSuccess,
                    handleError,
                    options
                );
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        } else {
            CustomerService.getLocationByAddressInput(location).then((res) => {
                if (res.address) {
                    setLatitude(res.latitude);
                    setLongitude(res.longitude);
                    getInfoSitter(res.latitude, res.longitude);
                }
            });
        }
    }, [state]);

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };

    const handleChangeLocation = (e) => {
        setLocation(e.target.value);
    };

    const handleConfirmLocation = (e) => {
        setState(!state);
    };

    const getInfoSitter = (lat, lng) => {
        setIsLoading(true);
        CustomerService.getSitterAround(lat, lng).then((res) => {
            const dataSources = res.map((item, index) => {
                return {
                    key: index + 1,
                    userId: item.userId,
                    sitterId: item.sitterId,
                    firstname: item.firstname,
                    lastName: item.lastName,
                    userImage: item.userImage === null ? Logo : item.userImage,
                    phone: item.phone,
                    address:
                        item.address.split(",")[0] +
                        ", " +
                        item.address.split(",")[3],
                    latitude: item.latitude,
                    longitude: item.longitude,
                    yearOfExperience: item.yearOfExperience,
                    description: item.description,
                    distance: item.distance,
                };
            });
            setSitters(dataSources);
            const sitterMarkers = res.map((item, index) => {
                return {
                    key: index + 1,
                    geocode: [item.latitude, item.longitude],
                    popUp: index + 1,
                    sitterId: item.sitterId,
                };
            });
            setMarker(sitterMarkers);
            setIsLoading(false);
        });
    };

    const handleSuccess = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        getInfoSitter(position.coords.latitude, position.coords.longitude);
    };

    const handleError = (error) => {
        console.log("Geolocation is not supported by this browser.");
    };

    const MapCenter = () => {
        const map = useMap();
        if (latitude !== "" && longitude !== "") {
            map.setView([latitude, longitude], 15);
        }
        return null;
    };

    const handleContact = (e) => {
        e.preventDefault();
        setId(e.target.parentElement.parentElement.getAttribute("data-key"));
        setSitterName(
            e.target.parentElement.querySelector("h3").textContent.slice(3)
        );
        setContact(true);
    };

    const handleInputCustom = () => {
        setIsShowDetail(false);
        setContact(false);
    };

    const handleConfirmContactSitter = (allValue, servicePrice) => {
        CustomerService.contactSitter({
            userId: allValue.userId,
            sitterId: allValue.sitterId,
            petId: allValue.petId,
            price: parseFloat(servicePrice),
            serviceId: allValue.serviceId,
            startDate: allValue.startDate,
            endDate: allValue.endDate,
            startTime: allValue.startTime,
            endTime: allValue.endTime,
            message: allValue.message,
            address: allValue.address,
        }).then((res) => {
            if (res.id) {
                setErrorServer(false);
                setErrorMessage("");
                setContact(false);
                CustomerService.doPayment(servicePrice, res.id).then((res) => {
                    window.location.href = res.url;
                });
            } else {
                setErrorServer(true);
                setErrorMessage(res.message);
                setContact(true);
            }
        });
    };

    const DivShowDetailSitter = (
        <ModalInput
            show={isShowDetail}
            handleInputCustom={handleInputCustom}
            content={
                <DetailSitter
                    sitterId={id}
                    handleInputCustom={handleInputCustom}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const DivShowContact = (
        <ModalInput
            show={contact}
            handleInputCustom={handleInputCustom}
            content={
                <ContactSitter
                    id={id}
                    sitterName={sitterName}
                    handleInputCustom={handleInputCustom}
                    handleConfirmContactSitter={handleConfirmContactSitter}
                    errorServer={errorServer}
                    errorMessage={errorMessage}
                />
            }
        />
    );

    const handleSearchSitters = (sitters) => {
        return sitters.filter(
            (sitter) =>
                sitter.firstname
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                sitter.address.toLowerCase().includes(keyword.toLowerCase()) ||
                sitter.lastName.toLowerCase().includes(keyword.toLowerCase()) ||
                sitter.phone.toLowerCase().includes(keyword.toLowerCase()) ||
                sitter.yearOfExperience
                    .toString()
                    .toLowerCase()
                    .includes(keyword.toLowerCase())
        );
    };

    return (
        <div className="outer-container">
            <div className="header-title">
                <h3>Services</h3>
            </div>
            <div className="test-container">
                <div className="left-side">
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
                            style={{ marginBottom: "10px" }}
                        ></input>
                    </div>

                    <div className="left-section-sitters">
                        {handleSearchSitters(sitters).map((sitter) => {
                            return (
                                <div
                                    className="user-card"
                                    key={sitter.key}
                                    data-key={sitter.sitterId}
                                >
                                    <div className="avatar-customer">
                                        <img
                                            src={sitter.userImage}
                                            alt="sitter.userImage"
                                        />
                                    </div>
                                    <div className="user-info">
                                        <h3>
                                            {sitter.key +
                                                ". " +
                                                sitter.firstname +
                                                " " +
                                                sitter.lastName}
                                        </h3>
                                        <p>Distance: {sitter.distance} km</p>
                                        <p>
                                            Year Of Experience :{" "}
                                            {sitter.yearOfExperience}
                                        </p>
                                        <p>Address: {sitter.address}</p>
                                        <p>Phone: {sitter.phone}</p>
                                        <button
                                            onClick={handleContact}
                                            className="contact-button"
                                        >
                                            Contact
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="right-side">
                    <div className="search-box">
                        <button className="btn-search">
                            <FontAwesomeIcon
                                className="icon-search"
                                icon={faLocationDot}
                            />
                        </button>
                        <input
                            onChange={handleChangeLocation}
                            className="input-search"
                            type="text"
                            placeholder="Enter your location..."
                            value={location}
                            style={{ marginBottom: "10px" }}
                        ></input>
                        <button
                            style={{
                                backgroundColor: "var(--success-color)",
                                marginLeft: 10,
                                borderRadius: 10,
                            }}
                            onClick={handleConfirmLocation}
                        >
                            Submit
                        </button>
                    </div>
                    <MapContainer center={[latitude, longitude]} zoom={10}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapCenter />

                        {marker.map((item) => (
                            <Marker
                                position={item.geocode}
                                icon={customIcon}
                                key={item.key}
                                eventHandlers={{
                                    click: (e) => {
                                        setId(item.sitterId);
                                        setIsShowDetail(true);
                                    },
                                }}
                            >
                                <Popup>{item.popUp}</Popup>
                            </Marker>
                        ))}
                        <Marker
                            position={[latitude, longitude]}
                            icon={customerIcon}
                        >
                            <Popup>You're here!!</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
            <Loading isLoading={isLoading} />
            {isShowDetail ? DivShowDetailSitter : null}
            {contact ? DivShowContact : null}
        </div>
    );
};

export default ServiceCustomer;
