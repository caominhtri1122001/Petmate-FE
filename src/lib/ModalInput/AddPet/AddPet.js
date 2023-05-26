import React, { useState } from "react";
import "./AddPet.css";
import Logo from "../../../assets/images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDog,
    faCat,
    faMars,
    faVenus,
} from "@fortawesome/free-solid-svg-icons";

const AddPet = (props) => {
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
    const [petError, setpetError] = useState({
        name: "",
        species: "",
        breed: "",
        age: "",
        gender: false,
        weight: "",
        image: "",
    });
    const [avatar, setAvatar] = useState(Logo);

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
        } catch (err) {
            console.log(err);
        }
    };

    const FormPet = (
        <div className="form-admin-content">
            <h4>Adding new pet</h4>
            <label
                className={
                    "error" +
                    (props.errorServer ? " error-show" : " error-hidden")
                }
            >
                {props.errorMessage}
            </label>
            <div className="form-teacher-content">
                <div className="teacher-content-left">
                    <div className="avatar-teacher">
                        <img src={avatar} alt="avatar" />
                        <label className="choose-file" htmlFor="upload-photo">
                            Choose Image
                        </label>
                        <input
                            id="upload-photo"
                            type="file"
                            name="image"
                            onChange={changeHandlerPetIMG}
                        />
                        <label
                            className={
                                "error" +
                                (petError.image
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            The selected file is not valid
                        </label>
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
                        <label
                            className={
                                "error" +
                                (petError.name
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Name must be greater than 2 chars
                        </label>
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
                                />
                                <label htmlFor="cat">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faCat}
                                    />
                                    <span>Cat</span>
                                </label>
                            </div>
                            {/* <label
                                className={
                                    "error" +
                                    (petError.species
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No species selected
                            </label> */}
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
                                />
                                <label htmlFor="female">
                                    <FontAwesomeIcon
                                        className="icon fa-regular"
                                        icon={faVenus}
                                    />
                                    <span>Female</span>
                                </label>
                            </div>
                            {/* <label
                                className={
                                    "error" +
                                    (petError.gender
                                        ? " error-show"
                                        : " error-hidden")
                                }
                            >
                                No gender selected
                            </label> */}
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
                        <label
                            className={
                                "error" +
                                (petError.breed
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Breed must be greater than 2 chars
                        </label>
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
                        <label
                            className={
                                "error" +
                                (petError.age ? " error-show" : " error-hidden")
                            }
                        >
                            Age must be numberic
                        </label>
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
                        <label
                            className={
                                "error" +
                                (petError.weight
                                    ? " error-show"
                                    : " error-hidden")
                            }
                        >
                            Weight must be numberic
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const handleBecomeSitter = () => {
        let name = false;
        let species = false;
        let breed = false;
        let age = false;
        let gender = false;
        let weight = false;
        let image = false;
        let check = false;

        if (!allValuesPet.name) {
            name = true;
            check = true;
        } else name = false;

        if (!allValuesPet.species) {
            species = true;
            check = true;
        } else {
            species = false;
        }

        if (!allValuesPet.breed) {
            breed = true;
            check = true;
        } else {
            breed = false;
        }

        if (allValuesPet.age === 0) {
            age = true;
            check = true;
        } else {
            age = false;
        }

        if (!!allValuesPet.image) {
            let imageList = allValuesPet.image.name.split(".");
            if (
                imageList[imageList.length - 1] !== "png" &&
                imageList[imageList.length - 1] !== "jpg"
            ) {
                image = true;
                check = true;
            } else image = false;
        }

        if (allValuesPet.weight === 0) {
            weight = true;
            check = true;
        } else {
            weight = false;
        }

        if (!allValuesPet.gender) {
            gender = true;
            check = true;
        } else {
            gender = false;
        }
        setpetError({
            name: name,
            species: species,
            breed: breed,
            age: age,
            image: image,
            gender: gender,
            weight: weight,
        });

        if (!check) {
            props.handleConfirmAddPet(allValuesPet);
        }
    };

    const clickSave = (e) => {
        e.preventDefault();
        handleBecomeSitter();
    };

    const FormBecomeSitter = (
        <div className="form-add-account">
            {FormPet}

            <div className="test">
                <button type="submit" onClick={clickSave} className="btn-ok">
                    Submit
                </button>
                <button
                    onClick={props.handleInputCustom}
                    className="btn-cancel"
                    style={{ marginLeft: 20 }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );

    return <div className="add-account-form">{FormBecomeSitter}</div>;
};

export default AddPet;
