import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Link, useNavigate } from 'react-router-dom';
import "react-bootstrap-typeahead/css/Typeahead.css";

// import fetchCities from "../../functions/fetch/fetchCities";
import fetchData from "../../functions/fetchData";
import LanguageSelector from "../../translations/LanguageSelector";

import styles from "./Main.module.css";

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

const Main = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState([]);
	const [guests, setGuests] = useState("");
	const [arrivalDate, setArrivalDate] = useState("");
	const [departueDate, setDepartueDate] = useState("");
  const [disabled, setDisabled] = useState("");

  const [cookieClosed, setCookieClosed] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCitiesFunc = async () => {
      const fetchedCities = await fetchData("getcities");
      setData(fetchedCities);
    };

    fetchCitiesFunc();

    const cookieOK = localStorage.getItem('cookiesOK');
    if (cookieOK !== null) {
      setCookieClosed(cookieOK);
    }
  }, []);

  useEffect(() => {
    // TODO: zrobić, sprawdzanie poprawności wybranych dat
    if(selectedCity.length > 0 && guests.length > 0 && arrivalDate.length > 0 && departueDate.length > 0){
      setDisabled("");
    }else{
      setDisabled(styles.disabled);
    }
  }, [selectedCity, guests, arrivalDate, departueDate]);

  let cities = data.map(city => city.city);

  const handleCitySelection = (selected) => {
    setSelectedCity(selected);
  };

  const handleSaveCookies = () => {
    localStorage.setItem('cookiesOK', true);
    setCookieClosed(true);
  }

  const handleSearch = () => {
    localStorage.setItem('arrivalDate', arrivalDate);
    localStorage.setItem('departueDate', departueDate);
    navigate(`/hotels/${selectedCity}/${guests}`);
  }

  const handleAllHotels = () => {
    localStorage.removeItem('arrivalDate');
    localStorage.removeItem('departueDate');
    navigate(`/hotels`);
  }
  
  return (
    <div className={styles.bgimage}>
      <div className={styles.bgoverlay}>
        <div className={`container col-xl-10 col-xxl-8 px-4 py-5 vertical_center `}>
          <LanguageSelector />
          <div className="row align-items-center g-lg-5 py-5">
            <div className="col-lg-7 text-center text-lg-start">
              <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">{t("main.title")}</h1>
              <p className="col-lg-10 fs-4">{t("main.motto")}</p>
            </div>
            <div className="col-md-10 mx-auto col-lg-5">
              <div className="p-4 p-md-5 border rounded-3 bg-body-tertiary" data-bitwarden-watching="1">
                <div className="form-floating mb-3" styles="height 58px">
                  <Typeahead
                    id="city"
                    options={cities}
                    emptyLabel={t("main.input.city.emptyCity")}
                    minLength={0}
                    selected={selectedCity}
                    onChange={handleCitySelection}
                    placeholder={t("main.input.city.chooseCity")}
                    style={{height: '58px'}}
                  />
                </div>
                <div className="form-floating mb-3">
                  <input type="number" min="1" className="form-control" id="floatingPassword" placeholder="Ilość osób" value={guests} onChange={(e) => setGuests(e.target.value)}/>
                  <label htmlFor="floatingPassword">{t("main.input.guests")}</label>
                </div>

                <div className="form-floating mb-3">
                  <div className="row">
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input type="date" className="form-control" id="arrivalDate" onChange={(e) => setArrivalDate(e.target.value)}/>
                        <label htmlFor="arrivalDate">{t("main.input.date.arrival")}</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="form-floating mb-3">
                        <input type="date" className="form-control" id="departueDate" onChange={(e) => setDepartueDate(e.target.value)}/>
                        <label htmlFor="departueDate">{t("main.input.date.departure")}</label>
                      </div>
                    </div>
                  </div>
                </div>
                <a href="" className={`w-100 btn btn-lg btn-primary mb-3 ${disabled}`} onClick={handleSearch}>{t("main.button.main.searchHotels")}</a>
                
                <hr className="my-4" />
                <small className="text-body-secondary">
                  <a href="" onClick={handleAllHotels}>{t("main.button.main.allHotels")}</a>
                </small>
              </div>
            </div>
          </div>

          {!cookieClosed && <div className="alert alert-primary alert-dismissible fade show position-absolute bottom-0" role="alert">
            {t("main.cookies")}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleSaveCookies}></button>
          </div>}

          
        </div>
      </div>
    </div>
  );
}

export default Main;
