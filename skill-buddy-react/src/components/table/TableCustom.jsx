import React from 'react';
import {Link} from "react-router-dom";
import PaginationCustom from "./Pagination";
import previous from "../../assets/img/table/right-arrow.png";
import RowsPerPage from "./RowsPerPage";

const TableCustom = () => {
    return <div>

        <div className="float-end search-bar w-25 p-0 pb-2">
            <form className="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Cerca nei risultati" title="Enter search keyword"/>
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
        </div>
        <table className="table  w-100">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">First <button className={"btn p-0 btn-link text-decoration-none"}>
                    <img src={previous} height={20}/>
                </button>
                </th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td scope="row">1</td>
                <td><Link>Dettaglio</Link></td>
                <td>Otto</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <td scope="row">2</td>
                <td><Link>Dettaglio</Link></td>
                <td>Thornton</td>
                <td>@fat</td>
            </tr>
            <tr>
                <td scope="row">3</td>
                <td><Link>Dettaglio</Link></td>
                <td>the Bird</td>
                <td>@twitter</td>
            </tr>
            </tbody>
        </table>
        <div className={"d-flex justify-content-between"}>
            <PaginationCustom/>
            <RowsPerPage/>
        </div>
    </div>
};

export default TableCustom;
