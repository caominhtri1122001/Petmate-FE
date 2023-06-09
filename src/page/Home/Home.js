import "./Home.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import logo from "../../assets/images/Logo.png";
import homeImage from "../../assets/images/homeImage.jpg";
import catBlog from "../../assets/images/catBlog.jpg";
import {
    faBusinessTime,
    faHouseChimneyMedical,
    faPaw,
    faCloudSun,
    faBoxOpen,
    faShower,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
    let history = useHistory();

    const handleClickBlog = () => {
        history.push("/blog");
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <Header />
            <div className="home-container">
                <header className="header">
                    <div className="overlay">
                        <img src={logo} className="logo" alt="logo" />
                        <h1 className="subtitle">Happy pets, happy owners</h1>
                    </div>
                </header>

                <section id="about">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h3 className="section-title">Why Pet Mate?</h3>
                                <p className="mb-1 font-weight-bold">
                                    At Pet Mate, we're passionate about pets and
                                    their well-being. Our store is dedicated to
                                    providing high-quality pet care services
                                    that cater to the unique needs of each pet.
                                    Our team of experienced and caring
                                    professionals understands that every pet is
                                    special, and we work hard to ensure that
                                    each one receives personalized attention and
                                    care. From grooming and boarding to training
                                    and veterinary care, we offer a range of
                                    services that are designed to keep your
                                    furry friend healthy and happy. When you
                                    choose Pet Mate, you can rest assured that
                                    your pet is in good hands. We pride
                                    ourselves on our commitment to excellence,
                                    and we strive to provide the best possible
                                    care for every pet that walks through our
                                    doors. So why choose Pet Mate? Because we're
                                    passionate about pets, and we're committed
                                    to providing the best possible care for your
                                    furry friend.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col">
                                        <img
                                            src={homeImage}
                                            className="w-100 rounded shadow"
                                            alt="headmaster"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="team">
                    <h3 className="section-title mb-5 text-center">
                        Services for every dog and cat
                    </h3>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faBusinessTime}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">Boarding</h3>
                                    <h5 className="my-3">
                                        Your pets stay overnight in your
                                        sitter’s home. They’ll be treated like
                                        part of the family in a comfortable
                                        environment.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faHouseChimneyMedical}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">House Sitting</h3>
                                    <h5 className="my-3">
                                        Your sitter takes care of your pets and
                                        your home. Your pets will get all the
                                        attention they need without leaving
                                        home.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faPaw}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">Dog Walking</h3>
                                    <h5 className="my-3">
                                        Your dog gets a walk around your
                                        neighborhood. Perfect for busy days and
                                        dogs with extra energy to burn.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faCloudSun}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">Doggy Day Care</h3>
                                    <h5 className="my-3">
                                        Your dog spends the day at your sitter’s
                                        home. Drop them off in the morning and
                                        pick up a happy pup in the evening.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faBoxOpen}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">Drop-In Visits</h3>
                                    <h5 className="my-3">
                                        Your sitter drops by your home to play
                                        with your pets, offer food, and give
                                        potty breaks or clean the litter box.
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <FontAwesomeIcon
                                        className="icon"
                                        icon={faShower}
                                        style={{
                                            width: "120px",
                                            height: "110px",
                                        }}
                                    />
                                    <h3 className="my-3">Pet Gromming</h3>
                                    <h5 className="my-3">
                                        Our professional groomers provide a
                                        range of services including bathing,
                                        trimming, brushing, nail clipping, ear
                                        and teeth cleaning, and addressing any
                                        skin allergies or issues.
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="blog">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h3 className="section-title">
                                    Pet Lovers Unite: Welcome to Our Blog
                                </h3>
                                <p className="mb-1 font-weight-bold">
                                    Welcome to our pet blog! Our blog is
                                    dedicated to providing you with helpful
                                    tips, informative articles, and heartwarming
                                    stories about our beloved companions.
                                    Whether you're a proud owner of a dog, cat,
                                    bird, or any other furry or feathered
                                    friend, our blog has something for everyone.
                                    Our team of pet experts and enthusiasts are
                                    passionate about sharing their knowledge and
                                    experience to help you provide the best care
                                    and love for your pets. From training and
                                    nutrition to health and wellness, we cover a
                                    wide range of topics to ensure your pets
                                    live happy and healthy lives. We also love
                                    to share heartwarming stories and cute
                                    photos of our furry and feathered friends.
                                    Follow us on our blog to stay up-to-date on
                                    the latest pet trends, news, and
                                    heartwarming stories. Don't forget to
                                    subscribe to our newsletter for exclusive
                                    content and special offers! Thank you for
                                    joining us on our pet-loving journey. We
                                    hope our blog brings joy, laughter, and
                                    valuable insights into your life and your
                                    pet's life.
                                </p>
                                <button
                                    style={{
                                        marginTop: 20,
                                        borderRadius: 20,
                                        fontSize: 30,
                                        backgroundColor: "var(--primary-color)",
                                        cursor: "pointer",
                                        color: "white",
                                    }}
                                    onClick={handleClickBlog}
                                >
                                    Discover Our Blog
                                </button>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col">
                                        <img
                                            src={catBlog}
                                            className="w-100 rounded shadow"
                                            alt="headmaster"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
