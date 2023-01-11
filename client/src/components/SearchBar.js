import React, { useState } from "react";

function SearchBar({search}) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = function (evt) {
        let newTerm = evt.target.value;
        setSearchTerm(newTerm);
    }

    const handleSearch = function (evt) {
        evt.preventDefault();
        search(searchTerm);
    }

    return (
        <form className="form" onSubmit={handleSearch}>
            <input value={searchTerm} onChange={handleChange} className="form-control form-control-sm m-1"/>
            <button type="submit" className="btn btn-primary btn-sm m-1">Search</button>
        </form>
    );
}

export default SearchBar;