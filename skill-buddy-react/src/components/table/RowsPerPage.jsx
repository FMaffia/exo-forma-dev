import React from 'react';

const RowsPerPage = () => {
    return (
        <div>
            <div className="form-floating " style={{minWidth: 200}}>
                <select className="form-select" id="floatingSelect" aria-label="Floating label select example">
                    <option selected>10</option>
                    <option value="1">15</option>
                    <option value="2">20</option>
                    <option value="3">30</option>
                </select>
                <label htmlFor="floatingSelect">Risultati per pagina</label>
            </div>
        </div>
    );
};

export default RowsPerPage;
