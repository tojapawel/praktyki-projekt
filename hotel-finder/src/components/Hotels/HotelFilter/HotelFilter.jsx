import React, { useState, useEffect } from "react";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { MdHorizontalRule } from "react-icons/md";

// eslint-disable-next-line
import i18n from "../../../translations/i18n";
import { useTranslation } from "react-i18next";

import filterHotels from "../../../functions/HotelFilter/filterHotels";
import sortHotels from "../../../functions/HotelFilter/sortHotels";

import sortPromoted from "../../../functions/HotelFilter/sortPromoted";

const HotelFilter = (props) => {
  const { t } = useTranslation();

  const [selectedCity, setSelectedCity] = useState([]);

  const [filtered, setFiltered] = useState(sortPromoted(props.hotels));

  const [guests, setGuests] = useState("");
  const [reviewScore, setReviewScore] = useState("");
  const [stars, setStars] = useState("");

  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [pets, setPets] = useState(false);
  const [roomService, setRoomService] = useState(false);

  const [breakfast, setBreakfast] = useState(false);
  const [available, setAvailable] = useState(false);
  
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");

  const [submitChecker, setSubmitChecker] = useState(true);
  const [sort, setSort] = useState("");

  let cities = [...new Set(props.hotels.map((hotel) => hotel.location.city))];

  const handleCitySelection = (selected) => {
    setSelectedCity(selected);
  };

  const handleReset = () => {
    setSelectedCity([]);
    setStars("");
    setGuests("");
    setReviewScore("");
    setWifi(false);
    setParking(false);
    setPets(false);
    setRoomService(false);
    setBreakfast(false);
    setAvailable(false);
    setPriceMin("");
    setPriceMax("");

    setSubmitChecker(true);
  };

  useEffect(() => {
    if (props.city != undefined) {
      setSelectedCity([props.city]);
      setGuests(props.guests);
      console.log("useEffect do przyjmowania danych");
    }
    setSubmitChecker(true);
  }, []);
  
  const handleFilter = () => {
    setSubmitChecker(true);
  };

  useEffect(() => {
    setFiltered(
      filterHotels(props.hotels, selectedCity, reviewScore, stars, wifi, parking, pets, roomService, breakfast, available, priceMin, priceMax, guests)
    );
    sortHotels(sort, filtered);

    sortPromoted(filtered);

    props.handleGetFiltered(filtered);
    setSubmitChecker(false);
    console.log("useEffect do filtrowania");

  }, [submitChecker]);

  //TODO: Dodać automatyczne uruchomienie funkcji handleSubmit() po załadowaniu strony

  return (
    <div className={`h-100 col-md-4 mt-4`}>
      <div className="p-5 text-bg-dark rounded-3">
        <h2>{t("hotels.filter.info")}</h2>

        <div className="mb-4 mt-4">
          <label htmlFor="city" className="form-label">
            {t("hotels.filter.city")}
          </label>
          <Typeahead
            id="city"
            options={cities}
            emptyLabel={t("main.input.city.emptyCity")}
            minLength={0}
            selected={selectedCity}
            onChange={handleCitySelection}
            placeholder={t("main.input.city.chooseCity")}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="guests" className="form-label">
            {t("main.input.guests")}
          </label>
          <input
            type="number"
            min="1"
            className="form-control"
            id="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reviewScore" className="form-label">
            {t("hotels.filter.minReviewScore")}
          </label>
          <input
            type="number"
            min="0"
            max="10"
            className="form-control"
            id="reviewScore"
            value={reviewScore}
            onChange={(e) => setReviewScore(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <div className="row">
          <label htmlFor="priceMin" className="form-label">
            {t("hotels.filter.price.price")}
          </label>
            <div style={{width: '47.5%'}}>
                
              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="priceMin"
                  value={priceMin}
                  placeholder={t("hotels.filter.price.from")}
                  onChange={(e) => setPriceMin(e.target.value)}
                />
                <span className="input-group-text">zł</span>
              </div>

            </div>

            <div style={{width: '5%', textAlign: 'center', position: 'relative', top: '5px', padding: '0 0 0 0'}}>
              <MdHorizontalRule />

            </div>

            <div style={{width: '47.5%'}}>

              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="priceMax"
                  value={priceMax}
                  placeholder={t("hotels.filter.price.to")}
                  onChange={(e) => setPriceMax(e.target.value)}
                />
                <span className="input-group-text">zł</span>
              </div>

            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="stars" className="form-label">
            {t("hotels.filter.stars.starsCount")}
          </label>
          <select
            className="form-select"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}>
            <option value="">{t("hotels.filter.stars.all")}</option>
            <option value="0">&#9734;&#9734;&#9734;&#9734;&#9734;</option>
            <option value="1">&#9733;&#9734;&#9734;&#9734;&#9734;</option>
            <option value="2">&#9733;&#9733;&#9734;&#9734;&#9734;</option>
            <option value="3">&#9733;&#9733;&#9733;&#9734;&#9734;</option>
            <option value="4">&#9733;&#9733;&#9733;&#9733;&#9734;</option>
            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
          </select>
        </div>

        <div className="form-check mr-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={wifi}
            id="wifi"
            onChange={(e) => setWifi(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="wifi">
            {t("hotels.filter.metadata.wifi")}
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={parking}
            id="parking"
            onChange={(e) => setParking(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="parking">
            {t("hotels.filter.metadata.parking")}
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={pets}
            id="pets"
            onChange={(e) => setPets(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="pets">
            {t("hotels.filter.metadata.pets")}
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={roomService}
            id="roomService"
            onChange={(e) => setRoomService(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="roomService">
            {t("hotels.filter.metadata.roomService")}
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={breakfast}
            id="breakfast"
            onChange={(e) => setBreakfast(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="breakfast">
            {t("hotels.filter.room.breakfast")}
          </label>
        </div>

        <div className="form-check my-2">
          <input
            className="form-check-input"
            type="checkbox"
            checked={available}
            id="available"
            onChange={(e) => setAvailable(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="available">
            {t("hotels.filter.room.onlyAvailable")}
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="sort" className="form-label">
            {t("hotels.filter.sort.sort")}
          </label>
          <select
            className="form-select"
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}>
              <option value="">{t("hotels.filter.sort.type.default")}</option>
              <option value="" disabled>----------------------------</option>
              <option value="gm">{t("hotels.filter.sort.type.stars.desc")}</option>
              <option value="gr">{t("hotels.filter.sort.type.stars.asc")}</option>
              <option value="" disabled>----------------------------</option>
              <option value="om">{t("hotels.filter.sort.type.reviewScore.desc")}</option>
              <option value="or">{t("hotels.filter.sort.type.reviewScore.asc")}</option>
              <option value="" disabled>----------------------------</option>
              <option value="odcm">{t("hotels.filter.sort.type.distanceFromCenter.desc")}</option>
              <option value="odcr">{t("hotels.filter.sort.type.distanceFromCenter.desc")}</option>
              <option value="" disabled>----------------------------</option>
              <option value="na">{t("hotels.filter.sort.type.hotelName")}</option>
              <option value="" disabled>----------------------------</option>
              <option value="ma">{t("hotels.filter.sort.type.city")}</option>
              <option value="" disabled>----------------------------</option>
          </select>
        </div>

        <div className="row mt-4">
          <div className="col-3">
            <button className="btn btn-outline-danger" type="button" onClick={handleReset}>
              {t("hotels.filter.sort.button.reset")}
            </button>
          </div>
          <div className="col-9">
            <button className="btn btn-outline-light w-100" type="button" onClick={handleFilter}>
              {t("hotels.filter.sort.button.filter")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFilter;
