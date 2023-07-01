import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import HotelCard from "../HotelCard/HotelCard";
import HotelFilter from "../HotelFilter/HotelFilter";

const HotelsList = (props) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setFilteredData(props.hotels);
  }, [props.hotels]);

  const handleGetFiltered = (filtered) => {
    setFilteredData(filtered);
  };

  return (
    <div className="container py-4">
      <div className="p-5 mb-4 text-bg-dark rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">
            <Link to={`/`} style={{ color: "inherit", textDecoration: "none" }}>
              Hotel finder
            </Link>
          </h1>
          <p className="col-md-8 fs-4">
            Poniżej znajdują się hotele, które spełniają Twoje wymagania.
          </p>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <HotelFilter hotels={props.hotels} handleGetFiltered={handleGetFiltered} />

        <div className="col-md-8 pt-4">
          {filteredData.length > 0 ? (
            filteredData.map((hotel, index) => (
              <HotelCard hotel={hotel} key={index} index={index} />
            ))
          ) : (
            <div className="container my-5">
              <div className="p-5 text-center">
                <h1 className="text-body-emphasis">Brak hoteli</h1>
                <p className="mx-auto fs-5 text-muted">
                  Nie mogliśmy znaleźć hoteli pasujących do Twoich preferencji.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HotelsList;
