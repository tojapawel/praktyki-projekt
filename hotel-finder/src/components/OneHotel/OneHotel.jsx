import {
  MdPets,
  MdWifi,
  MdDirectionsCar,
  MdCleaningServices,
  MdHome,
  MdCheck,
  MdClose,
} from "react-icons/md";

import React, { useState } from "react";
import CalculateStars from "../../functions/calculateStars";
import { Link } from "react-router-dom";

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";
import RoomRow from "./RoomRow";

const OneHotel = (props) => {
  const { t } = useTranslation();
  const [available, setAvailable] = useState();

  const setMetadataColor = (val) => {
    if (val) {
      return "text-success";
    }
    return "text-danger";
  };

  const setMetadataText = (val, type) => {
    if (val) {
      switch (type) {
        case "wifi":
          return t("hotel.metadata.true.wifi");
        case "parking":
          return t("hotel.metadata.true.parking");
        case "pets":
          return t("hotel.metadata.true.pets");
        case "roomService":
          return t("hotel.metadata.true.roomService");
        default:
          break;
      }
    }else{
      switch (type) {
        case "wifi":
          return t("hotel.metadata.false.wifi");
        case "parking":
          return t("hotel.metadata.false.parking");
        case "pets":
          return t("hotel.metadata.false.pets");
        case "roomService":
          return t("hotel.metadata.false.roomService");
        default:
          break;
      }
    }
  };

  if (props.hotels.length >= 1) {
    let hotel = props.hotels.filter((hotel) => hotel.id === props.hotelId);
    if (hotel.length === 1) {
      hotel = hotel[0];    

      return (
        <div className="container mb-5" id="top">
          <div className="container px-4 my-5">
            <div>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to={"/"} className="link-body-emphasis" href="#">
                      <MdHome style={{ position: "relative", bottom: "2px" }} />
                      <span className="visually-hidden">Strona główna</span>
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      to={"/hotels"}
                      className="link-body-emphasis fw-semibold text-decoration-none"
                      href="#">
                      Hotele
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    {hotel.name}
                  </li>
                </ol>
              </nav>
            </div>

            <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
              <div className="col d-flex flex-column align-items-start gap-2">
                <h2 className="fw-bold text-body-emphasis">{hotel.name}</h2>
                <p className="text-primary">
                  {hotel.location.city} ({hotel.location.postCode}), {hotel.location.address}
                </p>
              </div>

              <div className="col text-center">
                <div className="row row-cols-1 row-cols-sm-2 g-4">
                  <div className="col d-flex flex-column gap-2">
                    <h4 className="fw-semibold mb-0 text-body-emphasis">Ogległość do centrum</h4>
                    <p className="text-body-secondary fs-4">
                      {hotel.metadata.distanceFromCenter} km
                    </p>
                  </div>

                  <div className="col d-flex flex-column gap-2">
                    <h4 className="fw-semibold mb-0 text-body-emphasis">Ilość gwiazdek</h4>
                    <p className="text-body-secondary fs-4">
                      <CalculateStars stars={hotel.stars} />
                    </p>
                  </div>

                  <div className="col d-flex flex-column gap-2">
                    <h4 className="fw-semibold mb-0 text-body-emphasis">Ocena</h4>
                    <p className="text-body-secondary fs-4">{hotel.reviewsScore} / 10</p>
                  </div>

                  <div className="col d-flex flex-column gap-2">
                    <h4 className="fw-semibold mb-0 text-body-emphasis">Ilość pokoi</h4>
                    <p className="text-body-secondary fs-4">{hotel.rooms.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="mt-5 pb-2 mx-4 border-bottom text-dark">Udogodnienia</h2>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
            <div className="col d-flex align-items-start">
              <svg
                className="bi text-body-secondary flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"></svg>
              <div>
                <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel.metadata.wifi)}`}>
                  Wifi <MdWifi style={{ position: "relative", bottom: "2px" }} />
                </h3>
                <p>{setMetadataText(hotel.metadata.wifi, "wifi")}</p>
              </div>
            </div>

            <div className="col d-flex align-items-start">
              <svg
                className="bi text-body-secondary flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"></svg>
              <div>
                <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel.metadata.parking)}`}>
                  Parking <MdDirectionsCar style={{ position: "relative", bottom: "2px" }} />
                </h3>
                <p>{setMetadataText(hotel.metadata.parking, "parking")}</p>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <svg
                className="bi text-body-secondary flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"></svg>
              <div>
                <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel.metadata.pets)}`}>
                  Zwierzęta <MdPets style={{ position: "relative", bottom: "2px" }} />
                </h3>
                <p>{setMetadataText(hotel.metadata.pets, "pets")}</p>
              </div>
            </div>
            <div className="col d-flex align-items-start">
              <svg
                className="bi text-body-secondary flex-shrink-0 me-3"
                width="1.75em"
                height="1.75em"></svg>
              <div>
                <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel.metadata.roomService)}`}>
                  Obsługa pokoju{" "}
                  <MdCleaningServices style={{ position: "relative", bottom: "2px" }} />
                </h3>
                <p>{setMetadataText(hotel.metadata.roomService, "roomService")}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 pb-2 mx-4 text-dark border-bottom">
              <h2>Pokoje</h2>
              <input
                className="form-check-input"
                type="checkbox"
                checked={available}
                id="available"
                onChange={(e) => setAvailable(e.target.checked)}
              />
              <label className="form-check-label ms-2" htmlFor="available">Pokaż tylko dostępne</label>
          </div>

          <div className="table-responsive mx-4">
            <table className="table text-center table-striped table-hover">
              <thead>
                <tr>
                  <th>Cena</th>
                  <th>Ilość gości</th>
                  <th>Łóżka</th>
                  <th>Pokój rodziny</th>
                  <th>Powierzchnia</th>
                  <th>Śniadania</th>
                  <th>Dostępny</th>
                  <th>Rezerwacja</th>
                </tr>
              </thead>
              <tbody>

                {available === true && hotel.rooms.filter((room) => room.available === true).length === 0 && (
                    <tr>
                    <th colspan="8">Brak dostępnych pokoi</th>
                  </tr>
                )}

                {available === true
                  ? hotel.rooms
                      .filter((room) => room.available === true)
                      .map((room, index) => (
                        <RoomRow key={index} room={room} hotelId={hotel.id} index={index} />
                      ))
                  : hotel.rooms.map((room, index) => (
                      <RoomRow key={index} room={room} hotelId={hotel.id} index={index} />
                ))}

              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      props.isError(true);
      return;
    }
  }
};

export default OneHotel;
