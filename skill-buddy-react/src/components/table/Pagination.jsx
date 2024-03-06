import React from 'react';
import first from "../../assets/img/table/right.png";
import previous from "../../assets/img/table/right-arrow.png";

const PaginationCustom = () => {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true"><img src={first} style={{transform: "rotate(180deg)"}} height={20}/> </span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true"><img style={{scale: "0.6", transform: "rotate(180deg)"}} src={previous} height={20}/> </span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                </li>
                <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true"><img style={{scale: "0.6"}} src={previous} height={20}/> </span>
                        <span className="visually-hidden">Previous</span>
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true"><img style={{transform: "rotate(0deg)"}} src={first} height={20}/> </span>
                        <span className="visually-hidden">Previous</span>
                    </a>

                </li>
            </ul>
        </nav>
    );
};

export default PaginationCustom;
