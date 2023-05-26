import React from "react";
import Header from "../../common/Header/Header";
import homeImage from "../../assets/images/pet_login.png";
import Footer from "../../common/Footer/Footer";

const Blog = () => {
    return (
        <div class="tm-page-wrap mx-auto">
            <div class="position-relative">
                <Header />
                <div id="tm-video-container">
                    <video autoplay muted loop id="tm-video">
                        <source src="video/wheat-field.mp4" type="video/mp4" />
                    </video>
                </div>

                <i id="tm-video-control-button" class="fas fa-pause"></i>
            </div>

            <div class="container-fluid">
                <div id="content" class="mx-auto tm-content-container">
                    <main>
                        <div class="row">
                            <div class="col-12">
                                <h2 class="tm-page-title mb-4">
                                    Our Video Catalog
                                </h2>
                                <div class="tm-categories-container mb-5">
                                    <h3 class="tm-text-primary tm-categories-text">
                                        Categories:
                                    </h3>
                                    <ul class="nav tm-category-list">
                                        <li class="nav-item tm-category-item">
                                            <a
                                                href="#"
                                                class="nav-link tm-category-link active"
                                            >
                                                All
                                            </a>
                                        </li>
                                        <li class="nav-item tm-category-item">
                                            <a
                                                href="#"
                                                class="nav-link tm-category-link"
                                            >
                                                Drone Shots
                                            </a>
                                        </li>
                                        <li class="nav-item tm-category-item">
                                            <a
                                                href="#"
                                                class="nav-link tm-category-link"
                                            >
                                                Nature
                                            </a>
                                        </li>
                                        <li class="nav-item tm-category-item">
                                            <a
                                                href="#"
                                                class="nav-link tm-category-link"
                                            >
                                                Actions
                                            </a>
                                        </li>
                                        <li class="nav-item tm-category-item">
                                            <a
                                                href="#"
                                                class="nav-link tm-category-link"
                                            >
                                                Featured
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="row tm-catalog-item-list">
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Aenean aliquet sapien
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        Video thumbnail has a link to another
                                        HTML page. Categories{" "}
                                        <span class="tm-text-secondary">
                                            do not need
                                        </span>{" "}
                                        any JS. They are just separated HTML
                                        pages. Paging is at the bottom to extend
                                        the list as long as you want. This can
                                        be a large catalog.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Mauris in odio vel odio
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        You may need TemplateMo for a quick chat
                                        or send an email if you have any
                                        question about this CSS template.
                                        <span class="tm-text-secondary">
                                            font-family: 'Source Sans Pro',
                                            sans-serif; for this template.
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Sagittis sodales enim
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        You are allowed to use this video
                                        catalog for your business websites.
                                        Please do not make a re-distribution of
                                        our template ZIP file on any template
                                        collection website.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Nam tincidunt consectetur
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        You can apply this template for your
                                        commercial CMS theme. Nam sem leo,
                                        imperdiet non lacinia eget, volutpat ac
                                        massa. Donec mattis in velit quis
                                        commodo. Cras nec rutrum arcu.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Praesent posuere rhoncus
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        Duis vulputate nisl metus, eget dapibus
                                        nunc ultricies id. Ut augue mauris,
                                        varius quis nulla non, sollicitudin
                                        consectetur nisl. Donec eget arcu
                                        placerat, ullamcorper.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Turpis massa aliquam
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        Nunc neque risus, ultrices sed luctus
                                        at, iaculis at arcu. Pellentesque rutrum
                                        velit nec sapien ullamcorper ultrices.
                                        Vestibulum lectus risus, laoreet pretium
                                        ipsum
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Class aptent taciti sociosqu
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit. Phasellus bibendum orci
                                        sit amet dignissim rhoncus. Pellentesque
                                        pretium faucibus vestibulum.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Donec ac nisl ul elit
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        Suspendisse in odio congue, lobortis
                                        metus sed, venenatis nisl. In dapibus et
                                        massa feugiat facilisis. Maecenas
                                        venenatis aliquet nulla, a tincidunt
                                        erat suscipit eget.
                                    </p>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-sm-12 tm-catalog-item">
                                <div class="position-relative tm-thumbnail-container">
                                    <img
                                        src={homeImage}
                                        alt="pet"
                                        class="img-fluid tm-catalog-item-img"
                                    />
                                    <a
                                        href="video-page.html"
                                        class="position-absolute tm-img-overlay"
                                    >
                                        <i class="fas fa-play tm-overlay-icon"></i>
                                    </a>
                                </div>
                                <div class="p-4 tm-bg-gray tm-catalog-item-description">
                                    <h3 class="tm-text-primary mb-3 tm-catalog-item-title">
                                        Sed mattis nisi erat
                                    </h3>
                                    <p class="tm-catalog-item-text">
                                        Integer ultricies mi eu aliquet cursus.
                                        Nam sem leo, imperdiet non lacinia eget,
                                        volutpat ac massa. Donec mattis in velit
                                        quis commodo. Cras nec rutrum arcu.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <ul class="nav tm-paging-links">
                                <li class="nav-item active">
                                    <a href="#" class="nav-link tm-paging-link">
                                        1
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link tm-paging-link">
                                        2
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link tm-paging-link">
                                        3
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link tm-paging-link">
                                        4
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="#" class="nav-link tm-paging-link">
                                        Next
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;