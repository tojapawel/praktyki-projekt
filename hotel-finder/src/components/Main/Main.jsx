import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link } from 'react-router-dom';
import "react-bootstrap-typeahead/css/Typeahead.css";

import fetchData from "../../functions/fetchData";

const Main = () => {
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
    <div className="container col-xl-10 col-xxl-8 px-4 py-5 vertical_center">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Hotel finder</h1>
          <p className="col-lg-10 fs-4">Znajdź hotel swoich marzeń i odpocznij na najlepszych wakacjach pod słońcem.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary" data-bitwarden-watching="1">
            <div className="form-floating mb-3" styles="height 58px">
              <Typeahead
                id="city"
                options={cities}
                emptyLabel="Brak pasujących wyników"
                minLength={0}
                selected={selectedCity}
                onChange={handleCitySelection}
                placeholder="Wybierz miejscowość"
                style={{height: '58px'}}
              />
            </div>
            <div className="form-floating mb-3">
              <input type="number" min="0" className="form-control" id="floatingPassword" placeholder="Ilość osób" value={guests} onChange={(e) => setGuests(e.target.value)}/>
              <label htmlFor="floatingPassword">Ilość osób</label>
            </div>

            <div className="form-floating mb-3">
              <div className="row">
                <div className="col">
                  <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="arrivalDate" />
                    <label htmlFor="arrivalDate">Data przyjazdu</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3">
                    <input type="date" className="form-control" id="departueDate" />
                    <label htmlFor="departueDate">Data wyjazdu</label>
                  </div>
                </div>
              </div>
            </div>
            <Link className="w-100 btn btn-lg btn-primary mb-3" to={`/hotels/${selectedCity}/${guests}`}>Szukaj hoteli</Link>
            <hr className="my-4" />
            <small className="text-body-secondary">
              <Link to={`/hotels/`}>Pokaż wszystkie hotele</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
