import "./Home.css";
import Header from "../../common/Header/Header";
import Footer from "../../common/Footer/Footer";
import logo from "../../assets/images/Logo.png";
import homeimage from "../../assets/images/pet_login.png";
import presidentImage from "../../assets/images/pet_login.png";
import graduate from "../../assets/images/pet_login.png";
import recess from "../../assets/images/pet_login.png";
import chromebook from "../../assets/images/pet_login.png";
import athletic from "../../assets/images/pet_login.png";
import teams from "../../assets/images/pet_login.png";
import financial from "../../assets/images/pet_login.png";

const Home = () => {
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
                                            src={presidentImage}
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
                    <div className="container">
                        <h3 className="section-title mb-5 text-center">
                            Great Facility
                        </h3>
                        <div className="row">
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <img
                                        src={graduate}
                                        className="w-round-image"
                                        alt="graduation"
                                    />
                                    <h5 className="my-3">
                                        30 Primary schools currently enroll our
                                        graduates
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <img
                                        src={recess}
                                        className="w-round-image"
                                        alt="recess"
                                    />
                                    <h5 className="my-3">
                                        100% of students have recess every day
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <img
                                        src={athletic}
                                        className="w-round-image"
                                        alt="athletic"
                                    />
                                    <h5 className="my-3">
                                        85% athletic participation grades 1-5
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <img
                                        src={financial}
                                        className="w-round-image"
                                        alt="financial"
                                    />
                                    <h5 className="my-3">
                                        22% of families receive financial
                                        assistance
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <img
                                        src={chromebook}
                                        className="w-round-image"
                                        alt="chromebook"
                                    />
                                    <h5 className="my-3">
                                        1 Chromebook for every Primary Schooler
                                    </h5>
                                </div>
                            </div>
                            <div className="col-md-4 my-3">
                                <div className="team-wrapper text-center">
                                    <img
                                        src={teams}
                                        className="w-round-image"
                                        alt="teams"
                                    />
                                    <h5 className="my-3">19 athletic teams</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* <section id="testmonial">
                    <div className="container">
                        <h3 className="section-title mb-5 text-center">
                            Lastest News
                        </h3>
                        <div>
                            {notifications.length === 0 ? (
                                <p>No notifications yet</p>
                            ) : null}
                        </div>
                        <div className="row">
                            <NotificationItem notifications={notifications} />
                        </div>
                    </div>
                </section> */}
            </div>
            <Footer />
        </div>
    );
};

export default Home;
