import "./PetAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
    faMagnifyingGlass, faThumbsDown, faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import AdminService from "../../../config/service/AdminService";
import ModalCustom from "../../../lib/ModalCustom/ModalCustom";
import ConfirmAlert from "../../../lib/ConfirmAlert/ConfirmAlert";
import ReactPaginate from "react-paginate";
import Loading from "../../../lib/Loading/Loading";
import PetService from "../../../config/service/PetService";


function PetAdmin() {
    const [keyword, setKeyword] = useState("");
    const [pets, setPets] = useState([]);
    const [state, setState] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [errorServer, setErrorServer] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getPets();
    }, [state]);

    const getPets = () => {
        setIsLoading(true);
        PetService.getAllPets()
            .then((response) => {
                const dataSources = response.map(
                    (item, index) => {
                        return {
                            key: index + 1,
                            id: item.id,
                            name: item.name,
                            age: item.age,
                            species: item.species,
                            breed: item.breed,
                            weight: item.weight,
                            petImgUrl: item.petImgUrl,
                            owner: item.owner.firstName + item.owner.lastName,
                            ownerPhone: item.owner.phone,
                        };
                    }
                );

                const dataSourcesSorted = [...dataSources].sort((a, b) =>
                    a.firstname > b.firstname ? 1 : -1
                );

                setPets(dataSourcesSorted);

                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function PaginatedItems({ itemsPerPage, searchPet }) {
        const [itemOffset, setItemOffset] = useState(0);
        const endOffset = itemOffset + itemsPerPage;
        const currentItems = searchPet.slice(itemOffset, endOffset);
        const pageCount = Math.ceil(searchPet.length / itemsPerPage);
        const handlePageClick = (event) => {
            const newOffset =
                (event.selected * itemsPerPage) % searchPet.length;
            setItemOffset(newOffset);
        };
        return (
            <>
                <div className="table-content">
                    <TablePets pets={currentItems} />
                </div>
                <footer>
                    <hr></hr>
                    <ReactPaginate
                        previousLabel="Previous"
                        nextLabel="Next"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={pageCount}
                        pageRangeDisplayed={4}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageClick}
                        containerClassName="pagination justify-content-center"
                        pageClassName="page-item mr-2 ml-2"
                        pageLinkClassName="page-link"
                        previousClassName="previous-btn page-item"
                        previousLinkClassName="page-link"
                        nextClassName="next-btn page-item"
                        nextLinkClassName="page-link"
                        activeClassName="active"
                        hrefAllControls
                    />
                </footer>
            </>
        );
    };

    //Handle Search
    const searchPet = (pet) => {
        return pet.filter(
            (pet) =>
                pet.name
                    .toLowerCase()
                    .includes(keyword.toLowerCase()) ||
                pet.species.toLowerCase().includes(keyword.toLowerCase())
                ||
                pet.breed.toLowerCase().includes(keyword.toLowerCase())
                ||
                pet.age.toLowerCase().includes(keyword.toLowerCase())
                ||
                pet.weight.toLowerCase().includes(keyword.toLowerCase())
                ||
                pet.owner.toLowerCase().includes(keyword.toLowerCase())
                ||
                pet.ownerName.toLowerCase().includes(keyword.toLowerCase())
        );
    };

    const TablePets = ({ pets }) => {
        const petItem = pets.map((item) => (
            <tr data-key={item.id} key={item.key}>
                <td>{item.name}</td>
                <td>{item.species}</td>
                <td>{item.breed}</td>
                <td>{item.age}</td>
                <td>{item.weight}</td>
                <td>{item.owner}</td>
                <td>{item.ownerPhone}</td>
                <td>
                    <img
                        src={item.petImgUrl}
                        width={60}
                        alt='Player'
                    />
                </td>
            </tr>
        ));

        let headerPet;

        headerPet = (
            <tr>
                <th>Name</th>
                <th>Species</th>
                <th>Breed</th>
                <th>Age</th>
                <th>Weight</th>
                <th>Owner</th>
                <th>Owner Phone</th>
                <th>Image</th>
            </tr>
        );

        return (
            <table id="table">
                <thead>{headerPet}</thead>
                <tbody>{petItem}</tbody>
            </table>
        );
    };

    const handleChangeSearch = (e) => {
        setKeyword(e.target.value);
    };


    return (
        <div className="main-container">
            <header>
                <div>
                    <h3>All Pet Infomation</h3>
                </div>
                <div className="right-header">
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
                        ></input>
                    </div>
                </div>
            </header>
            {/* <div className="table-content"> */}

            <PaginatedItems
                itemsPerPage={6}
                searchPet={searchPet(pets)}
            />
            <Loading isLoading={isLoading} />
        </div>
    );
}

export default PetAdmin;
