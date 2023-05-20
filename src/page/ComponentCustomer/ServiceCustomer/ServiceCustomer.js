import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "./ServiceCustomer.css";
import "leaflet/dist/leaflet.css";
import Image from "../../../assets/images/pet_login.png";
import CustomerLocation from "../../../assets/images/customerLocation.png";

const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // size of the icon
});

const customerIcon = new Icon({
    iconUrl: CustomerLocation,
    iconSize: [38, 38],
});

// markers
const markers = [
    {
        geocode: [16.071614294070255, 108.15087535197601],
        popUp: "Hello, I am pop up 1",
    },
    {
        geocode: [16.071614294070255, 108.15087535197601],
        popUp: "Hello, I am pop up 2",
    },
    {
        geocode: [16.071614294070255, 108.15087535197601],
        popUp: "Hello, I am pop up 3",
    },
];

const ServiceCustomer = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    };

    const MapCenter = () => {
        const map = useMap();
        if (latitude !== "" && longitude !== "") {
            map.setView([latitude, longitude], 15);
        }
        return null;
    };

    return (
        <div className="outer-container">
            <div className="header-title">
                <h3>Services</h3>
            </div>
            <div className="container">
                <div className="left-section">
                    <div className="user-card">
                        <div className="avatar-customer">
                            <img src={Image} alt="Avatar" />
                        </div>
                        <div className="user-info">
                            <h3>Cao Minh Trí</h3>
                            <p>Số năm kinh nghiệm : 3</p>
                            <p>54 Nguyễn Lương Bằng</p>
                            <p>Khoảng cách : 10km</p>
                            <button className="contact-button">Contact</button>
                        </div>
                    </div>
                    <div className="user-card">
                        <div className="avatar-customer">
                            <img src={Image} alt="Avatar" />
                        </div>
                        <div className="user-info">
                            <h3>Họ và tên</h3>
                            <p>Số năm kinh nghiệm</p>
                            <p>Địa chỉ</p>
                            <p>Khoảng cách</p>
                            <button className="contact-button">Contact</button>
                        </div>
                    </div>
                    <div className="user-card">
                        <div className="avatar-customer">
                            <img src={Image} alt="Avatar" />
                        </div>
                        <div className="user-info">
                            <h3>Họ và tên</h3>
                            <p>Số năm kinh nghiệm</p>
                            <p>Địa chỉ</p>
                            <p>Khoảng cách</p>
                            <button className="contact-button">Contact</button>
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    <MapContainer center={[latitude, longitude]} zoom={10}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapCenter />

                        {markers.map((marker) => (
                            <Marker position={marker.geocode} icon={customIcon}>
                                <Popup>{marker.popUp}</Popup>
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
        </div>
    );
};

export default ServiceCustomer;
