import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { url, fetchCitiesOptions } from "../../api";
import "./search.css";

const Search = ({ onSearchChange }) => {
    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    };

    const loadOptions = (inputValue) => {
        return fetch(
            `${url}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            fetchCitiesOptions
        )
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => ({
                        value: `${city.latitude}, ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    })),
                };
            })
            .catch((err) => {
                console.error(err);
                return { options: [] };
            });
    };

    // Define custom styles
    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: "#f0f0f0", // Customize control background
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: "#333333", // Customize menu background
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? "#555555" : "#333333", // Highlight focused option
            color: "#ffffff", // Customize text color
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#333333", // Customize single value text color
        }),
    };

    return (
        <div className="weather">
            <div className="inputf" style={{ zIndex: "2" }}>
                <AsyncPaginate
                    placeholder="Search for city"
                    debounceTimeout={600}
                    value={search}
                    onChange={handleOnChange}
                    loadOptions={loadOptions}
                    styles={customStyles} // Apply custom styles
                />
            </div>
        </div>
    );
};

export default Search;
