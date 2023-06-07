import React, { useState, useEffect } from "react";
import "./ViewPet.css";
import Logo from "../../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDog,
    faCat,
    faMars,
    faVenus,
} from "@fortawesome/free-solid-svg-icons";
import PetService from "../../../config/service/PetService";

const ViewPet = (props) => {
    const [allValuesPet, setAllValuesPet] = useState({
        name: "",
        species: "",
        breed: "",
        age: 0,
        gender: false,
        weight: 0,
        image: "",
        owner: JSON.parse(localStorage.getItem("@Login")).userId,
    });
    const [avatar, setAvatar] = useState(Logo);
    const [isChangeImage, setIsChangeImage] = useState(false);

    //fetch data
    useEffect(() => {
        PetService.getPetById(props.petId).then((res) => {
            !!res.petImgUrl ? setAvatar(res.petImgUrl) : setAvatar(Logo);
            setAllValuesPet({
                name: res.name,
                species: res.species,
                breed: res.breed,
                age: res.age,
                gender: res.gender,
                weight: res.weight,
                // image: res.petImgUrl,
                owner: JSON.parse(localStorage.getItem("@Login")).userId,
            });
        });
    }, []);

    const changeHandlerSitter = (e) => {
        setAllValuesPet({
            ...allValuesPet,
            [e.target.name]: e.target.value,
        });
    };

    const changeHandlerPetIMG = (e) => {
        setAllValuesPet({
            name: allValuesPet.name,
            gender: allValuesPet.gender,
            species: allValuesPet.species,
            breed: allValuesPet.breed,
            age: allValuesPet.age,
            weight: allValuesPet.weight,
            image: e.target.files[0],
            owner: JSON.parse(localStorage.getItem("@Login")).userId,
        });
        try {
            setAvatar(URL.createObjectURL(e.target.files[0]));
            setIsChangeImage(true);
        } catch (err) {
            console.log(err);
        }
    };

    const FormPet = (
        <div className="form-admin-content">
            <h2>Pet's Information</h2>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="avatar-teacher">
                        <img src={avatar} alt="avatar" />
                        <input
                            id="upload-photo"
                            type="file"
                            name="image"
                            onChange={changeHandlerPetIMG}
                        />
                    </div>
                    <div className="type-input" style={{ marginTop: 20 }}>
                        <h4>Your pet's name</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            value={allValuesPet.name}
                            onChange={changeHandlerSitter}
                        />
                    </div>
                    <div className="type-input">
                        <h4>Species</h4>
                        <div className="radio-btn-species">
                            <div className="radio">
                                <input
                                    id="dog"
                                    type="radio"
                                    value="dog"
                                    name="species"
                                    onChange={changeHandlerSitter}
                                    checked={allValuesPet.species === "dog"}
                                />
                                <label htmlFor="dog">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faDog}
                                    />

                                    <span>Dog</span>
                                </label>
                                <input
                                    id="cat"
                                    type="radio"
                                    value="cat"
                                    name="species"
                                    onChange={changeHandlerSitter}
                                    checked={allValuesPet.species === "cat"}
                                />
                                <label htmlFor="cat">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faCat}
                                    />
                                    <span>Cat</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="type-input">
                        <h4>Gender</h4>
                        <div className="radio-btn-gender">
                            <div className="radio">
                                <input
                                    id="male"
                                    type="radio"
                                    value={true}
                                    name="gender"
                                    onChange={changeHandlerSitter}
                                    checked={allValuesPet.gender === true}
                                />
                                <label htmlFor="male">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faMars}
                                    />
                                    <span>Male</span>
                                </label>
                                <input
                                    id="female"
                                    type="radio"
                                    value={false}
                                    name="gender"
                                    onChange={changeHandlerSitter}
                                    checked={allValuesPet.gender === false}
                                />
                                <label htmlFor="female">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faVenus}
                                    />
                                    <span>Female</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="teacher-content-right">
                    <div className="type-input" style={{ marginTop: 165 }}>
                        <h4>Breed</h4>
                        <input
                            className="input-content"
                            type="text"
                            name="breed"
                            placeholder="Enter your pet's breed"
                            value={allValuesPet.breed}
                            onChange={changeHandlerSitter}
                        />
                    </div>
                    <div className="type-input">
                        <h4>Age</h4>
                        <input
                            className="input-content"
                            type="number"
                            name="age"
                            placeholder="Enter your pet's age"
                            value={allValuesPet.age}
                            onChange={changeHandlerSitter}
                        />
                    </div>
                    <div className="type-input">
                        <h4>Weight</h4>
                        <input
                            className="input-content"
                            type="number"
                            name="weight"
                            placeholder="Enter your pet's weight"
                            value={allValuesPet.weight}
                            onChange={changeHandlerSitter}
                        />
                    </div>
                </div>
            </div>
        </div>
    );

    const FormViewPet = (
        <div className="form-add-account">
            {FormPet}

            <div className="test">
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                    style={{ marginLeft: 20 }}
                >
                    Close
                </button>
            </div>
        </div>
    );

    return <div className="add-account-form">{FormViewPet}</div>;
};

export default ViewPet;
