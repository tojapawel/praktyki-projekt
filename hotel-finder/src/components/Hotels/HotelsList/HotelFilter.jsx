import React, { useState, useEffect } from "react";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

import fetchData from "../../../functions/fetchData";

const HotelFilter = (props) => {
    const [selectedCity, setSelectedCity] = useState([]);
	const [guests, setGuests] = useState("");

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchDataFunc = async () => {
        const fetchedData = await fetchData();
        setData(fetchedData);
        };

        fetchDataFunc();
    }, []);

    let cities = [...new Set(data.map(hotel => hotel.location.city))];

    const handleCitySelection = (selected) => {
        setSelectedCity(selected);
    };

    return (
        <div className="h-100 col-md-4 sticky-top pt-4">
            <div className="p-5 text-bg-dark rounded-3">
                <h2>Filtrowanie hoteli</h2>

                <div className="mb-4 mt-4">
                    <label htmlFor="city" className="form-label">Miejscowość</label>
                    <Typeahead
                        id="city"
                        options={cities}
                        emptyLabel="Brak pasujących wyników"
                        minLength={0}
                        selected={selectedCity}
                        onChange={handleCitySelection}
                        placeholder="Wybierz miejscowość"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="guests" className="form-label">Ilość osób</label>
                    <input type="number" min="1" className="form-control" id="guests" />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="reviewScore" className="form-label">Minimalna ocena</label>
                    <input type="number" min="0" max="10" className="form-control" id="reviewScore" />
                </div>

                <button className="btn btn-outline-light w-100" type="button">Filtruj</button>
            </div>
        </div>

        // TODO: Dodać responsywność i możliwość zwijania i rozwijania na mobilkach
    );
  }
  
  export default HotelFilter;
  