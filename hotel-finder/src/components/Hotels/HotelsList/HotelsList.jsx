import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import HotelCard from "../HotelCard/HotelCard";
import HotelFilter from "../HotelFilter/HotelFilter";

// eslint-disable-next-line
import i18n from "../../../translations/i18n";
import { useTranslation } from "react-i18next";

//TODO: Zrobić wyciąganie danych z bazy danych nową metodą

const HotelsList = (props) => {
  const { t } = useTranslation();

  const [filteredData, setFilteredData] = useState(props.hotels);

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
            {t("hotels.hotelsList.info")}
          </p>
        </div>
      </div>

      <div className="row align-items-md-stretch">
        <HotelFilter hotels={props.hotels} city={props.city} guests={props.guests} handleGetFiltered={handleGetFiltered} />

        <div className="col-md-8 pt-4">
          <small className="text-body-secondary">{t("hotels.hotelsList.hotelsFound")}: {filteredData.length}</small>
          {filteredData.length > 0 ? (
            filteredData.map((hotel, index) => (
              <HotelCard hotel={hotel} key={index} index={index} />
            ))
          ) : (
            <div className="container my-5">
              <div className="p-5 text-center">
                <h1 className="text-body-emphasis">{t("hotels.hotelsList.emptyHotels.noHotels")}</h1>
                <p className="mx-auto fs-5 text-muted">
                {t("hotels.hotelsList.emptyHotels.info")}
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
