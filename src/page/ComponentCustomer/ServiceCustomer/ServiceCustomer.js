import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, divIcon, point } from "leaflet";
import "./ServiceCustomer.css";
import "leaflet/dist/leaflet.css";
import Image from "../../../assets/images/pet_login.png";

// create custom icon
const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = function (cluster) {
    return new divIcon({
        html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
        className: "custom-marker-cluster",
        iconSize: point(33, 33, true),
    });
};

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
    return (
        <div className="outer-container">
            <div className="header-title">
                <h3>Services</h3>
            </div>
            <div class="container">
                <div class="left-section">
                    <div class="user-card">
                        <img src={Image} alt="Avatar" />
                        <h3>Họ và tên</h3>
                        <p>Thông tin người dùng</p>
                    </div>
                    <div class="user-card">
                        <img src={Image} alt="Avatar" />
                        <h3>Họ và tên</h3>
                        <p>Thông tin người dùng</p>
                    </div>
                    <div class="user-card">
                        <img src={Image} alt="Avatar" />
                        <h3>Họ và tên</h3>
                        <p>Thông tin người dùng</p>
                    </div>
                </div>
                <div class="right-section">
                    <MapContainer
                        center={[16.071614294070255, 108.15087535197601]}
                        zoom={20}
                    >
                        {/* OPEN STREEN MAPS TILES */}
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {markers.map((marker) => (
                            <Marker position={marker.geocode} icon={customIcon}>
                                <Popup>{marker.popUp}</Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default ServiceCustomer;
