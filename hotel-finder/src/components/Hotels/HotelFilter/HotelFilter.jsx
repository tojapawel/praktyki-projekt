import React, { useState, useEffect } from "react";

import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { MdHorizontalRule } from "react-icons/md";

const HotelFilter = (props) => {
  const [selectedCity, setSelectedCity] = useState([]);

  const sortPromoted = (init) => {
    init.sort((a, b) => {
      if (a.promoted && !b.promoted) {
        return -1;
      }

      if (!a.promoted && b.promoted) {
        return 1;
      }
    });

    return init;
  }

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

  const [submitChecker, setSubmitChecker] = useState(false);
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

    props.handleGetFiltered(props.hotels);
  };

  const handleFilter = () => {
    setSubmitChecker(true);
  };

  useEffect(() => {
    setFiltered(props.hotels.filter((hotel) => {
			if (selectedCity.length !== 0 && hotel.location.city.toLocaleLowerCase() !== selectedCity[0].toLocaleLowerCase()) {
				return false;
			}

      if (reviewScore && hotel.reviewsScore < reviewScore) {
				return false;
			}

      if (stars && hotel.stars != stars) {
				return false;
			}

      if (wifi && hotel.metadata.wifi !== wifi) {
				return false;
			}

			if (parking && hotel.metadata.parking !== parking) {
				return false;
			}

			if (pets && hotel.metadata.pets !== pets) {
				return false;
			}

			if (roomService && hotel.metadata.roomService !== roomService) {
				return false;
			}

      if (breakfast && (hotel.rooms.some((room) => room.breakfast === true) !== breakfast)) {
				return false;
			}

      if (available && (hotel.rooms.some((room) => room.available === true) !== available)) {
				return false;
			}

      if (priceMin && (hotel.rooms.some((room) => room.price < parseInt(priceMin)))) {
				return false;
			}

      if (priceMax && (hotel.rooms.some((room) => room.price > parseInt(priceMax)))) {
				return false;
			}

      if (guests && (hotel.rooms.some((room) => room.maxGuests >= parseInt(guests)) === false)) {
				return false;
			}

      //TODO: Dodać filtr cenowy

			return true;
		}));

		switch (sort) {
			case "gm":
				filtered.sort((a, b) => b.stars - a.stars);
				break;
			case "gr":
				filtered.sort((a, b) => a.stars - b.stars);
				break;
			case "om":
				filtered.sort((a, b) => b.reviewsScore - a.reviewsScore);
				break;
			case "or":
				filtered.sort((a, b) => a.reviewsScore - b.reviewsScore);
				break;
			case "odcm":
				filtered.sort((a, b) => b.metadata.distanceFromCenter - a.metadata.distanceFromCenter);
				break;
			case "odcr":
				filtered.sort((a, b) => a.metadata.distanceFromCenter - b.metadata.distanceFromCenter);
				break;
			case "na":
				filtered.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "ma":
				filtered.sort((a, b) => a.location.city.localeCompare(b.location.city));
				break;
			default:
				break;
		}

    sortPromoted(filtered);

    props.handleGetFiltered(filtered);
    setSubmitChecker(false);
  }, [submitChecker]);

  return (
    //TODO: wyświetlanie sortowania do zmiany
    <div className={`h-100 col-md-4 mt-4`}>
      <div className="p-5 text-bg-dark rounded-3">
        <h2>Filtrowanie hoteli</h2>

        <div className="mb-4 mt-4">
          <label htmlFor="city" className="form-label">
            Miejscowość
          </label>
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
          <label htmlFor="guests" className="form-label">
            Ilość osób
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
            Minimalna ocena
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
            Cena
          </label>
            <div style={{width: '47.5%'}}>
                
              <div className="input-group">
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="priceMin"
                  value={priceMin}
                  placeholder="od"
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
                  placeholder="do"
                  onChange={(e) => setPriceMax(e.target.value)}
                />
                <span className="input-group-text">zł</span>
              </div>

            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="stars" className="form-label">
            Ilość gwiazdek
          </label>
          <select
            className="form-select"
            id="stars"
            value={stars}
            onChange={(e) => setStars(e.target.value)}>
            <option value="">Wszystkie</option>
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
            Wifi
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
            Parking
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
            Zwierzęta
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
            Obsługa pokoju
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
            Śniadania
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
            Pokaż tylko dostępne
          </label>
        </div>

        <div className="my-4">
          <label htmlFor="sort" className="form-label">
            Sortowanie
          </label>
          <select
            className="form-select"
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}>
              <option value="">Sortowanie</option>
              <option value="" disabled>----------------------------</option>
              <option value="gm">Gwiazdki malejąco</option>
              <option value="gr">Gwiazdki rosnąco</option>
              <option value="" disabled>----------------------------</option>
              <option value="om">Ocena malejąco</option>
              <option value="or">Ocena rosnąco</option>
              <option value="" disabled>----------------------------</option>
              <option value="odcm">Odległość do centrum malejąco</option>
              <option value="odcr">Odległość do centrum rosnąco</option>
              <option value="" disabled>----------------------------</option>
              <option value="na">Nazwa hotelu alfabetycznie</option>
              <option value="" disabled>----------------------------</option>
              <option value="ma">Miasto alfabetycznie</option>
              <option value="" disabled>----------------------------</option>
          </select>
        </div>

        <div className="row mt-4">
          <div className="col-3">
            <button className="btn btn-outline-danger" type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="col-9">
            <button className="btn btn-outline-light w-100" type="button" onClick={handleFilter}>
              Filtruj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelFilter;
