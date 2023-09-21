import { MdHome } from "react-icons/md";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

import CryptoJS from "crypto-js";

const ReservationForm = (props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [daysCount, setDaysCount] = useState(0);
  const [arrivalDate, setArrivalDate] = useState();
  const [departueDate, setDepartueDate] = useState();
  const [dateError, setDateError] = useState("");
  const [dateLoaded, setDateLoaded] = useState(false);

  const [promo, setPromo] = useState(0);
  const [promoCode, setPromoCode] = useState(null);
  const [promoCodeShow, setPromoCodeShow] = useState(null);
  const [promoCodeHash, setPromoCodeHash] = useState(null);
  const [promoError, setPromoError] = useState(null);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [mailError, setMailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [zipError, setZipError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  const [price, setPrice] = useState(0);

  const hotel = props.hotel[0];
  const room = props.room[0];

  useEffect(() => {
    const arrivalDateStorage = localStorage.getItem("arrivalDate");
    const departueDateStorage = localStorage.getItem("departueDate");
    if (arrivalDateStorage !== null && departueDateStorage !== null && !dateLoaded) {
      setArrivalDate(arrivalDateStorage);
      setDepartueDate(departueDateStorage);
      setDateLoaded(true);
    }
  }, []);

  useEffect(() => {
    const today = new Date();
    const tempArrivalDate = new Date(arrivalDate);
    const tempDepartueDate = new Date(departueDate);
    setDaysCount(0);

    const checkDate = () => {
      if (tempDepartueDate < 0 || tempArrivalDate < 0) {
        setDateError(t("reservation.errors.date.minus"));
        setDaysCount(0);
        return;
      }

      if (today > tempArrivalDate || today > tempDepartueDate) {
        setDateError(t("reservation.errors.date.past"));
        setDaysCount(0);
        return;
      }

      if (tempDepartueDate <= tempArrivalDate) {
        setDateError(t("reservation.errors.date.future"));
        setDaysCount(0);
        return;
      }

      const daysDifference = (tempDepartueDate - tempArrivalDate) / (1000 * 60 * 60 * 24);
      if (daysDifference) {
        setDaysCount(daysDifference);
      } else {
        setDaysCount(0);
      }

      setDateError(null);
    };

    checkDate();
  }, [arrivalDate, departueDate]);

  useEffect(() => {
    setPrice(daysCount * room.price - (daysCount * room.price * promo) / 100);
  }, [daysCount, promo]);

  useEffect(() => {
    setPromoCodeHash(CryptoJS.SHA256(promoCode).toString(CryptoJS.enc.Hex));
  }, [promoCode]);

  const handlePromoCode = () => {
    setPromoCodeShow(promoCode);

    const foundCode = props.codes.find((item) => item.code === promoCodeHash);

    if (foundCode) {
      if (foundCode.quantity > 0) {
        setPromo(foundCode.value);
        setPromoError(null);
      } else {
        setPromo(0);
        setPromoError(t("reservation.errors.promoCode.used"));
      }
    } else {
      setPromo(0);
      setPromoError(t("reservation.errors.promoCode.bad"));
    }
  };

  function validateString(str, pattern) {
    return pattern.test(str);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    var formOkey = true;

    const formData = [
      event.target[0].value, // firstname
      event.target[1].value, // lastname
      event.target[2].value, // email
      event.target[3].value, // address
      event.target[4].value, // address2
      event.target[5].value, // city
      event.target[6].value, // zip
    ];

    if (!arrivalDate || !departueDate) {
      setDateError(t("reservation.errors.date.empty"));
      formOkey = false;
    }

    if (!formData[0]) {
      setFirstNameError(t("reservation.errors.personalData.firstName"));
      formOkey = false;
    } else {
      setFirstNameError(false);
    }

    if (!formData[1]) {
      setLastNameError(t("reservation.errors.personalData.lastName"));
      formOkey = false;
    } else {
      setLastNameError(false);
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailInput = formData[2];
    if (!emailInput) {
      setMailError(t("reservation.errors.personalData.email.empty"));
      formOkey = false;
    } else if (!validateString(emailInput, emailPattern)) {
      setMailError(t("reservation.errors.personalData.email.bad"));
      formOkey = false;
    } else {
      setMailError(false);
    }

    if (!formData[3]) {
      setAddressError(t("reservation.errors.personalData.address"));
      formOkey = false;
    } else {
      setAddressError(false);
    }

    if (!formData[5]) {
      setCityError(t("reservation.errors.personalData.city"));
      formOkey = false;
    } else {
      setCityError(false);
    }

    var zipFormat = /^[A-Z0-9]{2}-[A-Z0-9]{3}$/;
    var zip = formData[6];

    if (!zip) {
      setZipError(t("reservation.errors.personalData.zip.empty"));
      formOkey = false;
    } else if (!zipFormat.test(zip)) {
      setZipError(t("reservation.errors.personalData.zip.bad"));
      formOkey = false;
    } else {
      setZipError(false);
    }

    const paymentOptions = ["card", "qtransfer", "transfer", "blik"];
    let payment = null;

    for (let i = 7; i <= 10; i++) {
      if (event.target[i].checked) {
        payment = paymentOptions[i - 7];
        break;
      }
    }

    if (!payment) {
      setPaymentError(t("reservation.errors.payment"));
      formOkey = false;
    } else {
      setPaymentError(false);
    }

    formData.push(
      payment,
      hotel.id,
      room.id,
      price,
      new Date(arrivalDate),
      new Date(departueDate),
      new Date()
    );

    if (formOkey) {
      navigate(`/reservation/final/?data=${JSON.stringify(formData)}`);
    }
  };

  return (
    <div className="container px-4 mt-5" id="top">
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
                {t("main.breadcrumbs.hotels")}
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                to={`/hotel/${hotel.hotel_id}`}
                className="link-body-emphasis fw-semibold text-decoration-none"
                href="#">
                {hotel.name}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {t("main.breadcrumbs.reservation")}
            </li>
          </ol>
        </nav>
      </div>

      <main>
        <div className="py-5 text-center">
          <h2>{t("reservation.main.roomReservation")}</h2>
          <p className="fs-5 text-secondary">
            {t("reservation.main.info")} <strong>{hotel.name}</strong>
          </p>
        </div>

        <div className="row g-5">
          <div className="col-md-5 col-lg-4 order-md-last">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-primary">{t("reservation.summary.summaryText")}</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{t("reservation.summary.daysCount")}</h6>
                </div>
                <span className="text-body-secondary">{daysCount}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{t("reservation.summary.pricePerNight")}</h6>
                </div>
                <span className="text-body-secondary">{room.price} zł</span>
              </li>

              {promo !== 0 && (
                <>
                  <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                    <div className="text-success">
                      <h6 className="my-0">{t("reservation.summary.promoCode")}</h6>
                      <small>{promoCodeShow}</small>
                    </div>
                    <span className="text-success">−{promo} %</span>
                  </li>
                </>
              )}

              <li className="list-group-item d-flex justify-content-between">
                <span>{t("reservation.summary.summary")}</span>
                <strong>{price.toFixed(2)} zł</strong>
              </li>
            </ul>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder={t("reservation.summary.promoCode")}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="btn btn-secondary" onClick={handlePromoCode}>
                {t("reservation.summary.promoCodeBtn")}
              </button>
            </div>

            {promoError && <div className="text-danger">{promoError}</div>}
          </div>
          <div className="col-md-7 col-lg-8">
            <hr className="my-4" />

            <h4 className="mb-3">{t("reservation.date")}</h4>

            <div className="my-3">
              <div className="row">
                <div className="col">
                  <div className="form-floating mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="arrivalDate"
                      value={arrivalDate || ""}
                      onChange={(e) => setArrivalDate(e.target.value)}
                    />
                    <label htmlFor="arrivalDate">{t("main.input.date.arrival")}</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating mb-3">
                    <input
                      type="date"
                      className="form-control"
                      id="departueDate"
                      value={departueDate || ""}
                      onChange={(e) => setDepartueDate(e.target.value)}
                    />
                    <label htmlFor="departueDate">{t("main.input.date.departure")}</label>
                  </div>
                </div>
              </div>
              {dateError != "" && <div className="text-danger">{dateError}</div>}
            </div>

            <hr className="my-4" />

            <h4 className="mb-3">{t("reservation.personalData.personalDataText")}</h4>
            <form className="needs-validation" onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    {t("reservation.personalData.firstName")}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${firstNameError ? "is-invalid" : ""}`}
                    name="firstname"
                    id="firstName"
                  />
                  {firstNameError && <div className="text-danger">{firstNameError}</div>}
                </div>

                <div className="col-sm-6">
                  <label htmlFor="lastName" className="form-label">
                    {t("reservation.personalData.lastName")}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${lastNameError ? "is-invalid" : ""}`}
                    id="lastName"
                  />
                  {lastNameError && <div className="text-danger">{lastNameError}</div>}
                </div>

                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    {t("reservation.personalData.email")}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${mailError ? "is-invalid" : ""}`}
                    id="email"
                    placeholder="you@example.com"
                  />
                  {mailError && <div className="text-danger">{mailError}</div>}
                </div>

                <div className="col-12">
                  <label htmlFor="address" className="form-label">
                    {t("reservation.personalData.address")}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${addressError ? "is-invalid" : ""}`}
                    id="address"
                    placeholder="Ulica i numer domu"
                  />
                  {addressError && <div className="text-danger">{addressError}</div>}
                </div>

                <div className="col-12">
                  <label htmlFor="address2" className="form-label">
                    {t("reservation.personalData.address2")}{" "}
                    <span className="text-body-secondary">(Opcjonalnie)</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address2"
                    placeholder="Numer mieszkania"
                  />
                </div>

                <div className="col-8">
                  <label htmlFor="city" className="form-label">
                    {t("reservation.personalData.city")}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${cityError ? "is-invalid" : ""}`}
                    id="city"
                  />
                  {cityError && <div className="text-danger">{cityError}</div>}
                </div>

                <div className="col-4">
                  <label htmlFor="zip" className="form-label">
                    {t("reservation.personalData.zip")}
                  </label>
                  <input
                    type="text"
                    className={`form-control ${zipError ? "is-invalid" : ""}`}
                    id="zip"
                    placeholder="XX-XXX"
                  />
                  {zipError && <div className="text-danger">{zipError}</div>}
                </div>
              </div>

              <hr className="my-4" />

              <h4 className="mb-3">{t("reservation.payment.payment")}</h4>

              {/* TODO: pobieranie sposobów płatności z bazy danych */}

              <div className="my-3">
                <div className="form-check">
                  <input id="card" name="paymentMethod" type="radio" className="form-check-input" />
                  <label className="form-check-label" htmlFor="card">
                    {t("reservation.payment.card")}{" "}
                    <span className="text-body-secondary">(VISA / MASTERCARD)</span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="quicktransfer"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="quicktransfer">
                    {t("reservation.payment.qtransfer")}{" "}
                    <span className="text-body-secondary">(PayU)</span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="transfer"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                  />
                  <label className="form-check-label" htmlFor="transfer">
                    {t("reservation.payment.transfer")}
                  </label>
                </div>
                <div className="form-check">
                  <input id="blik" name="paymentMethod" type="radio" className="form-check-input" />
                  <label className="form-check-label" htmlFor="blik">
                    {t("reservation.payment.blik")}
                  </label>
                </div>
                {paymentError != "" && <div className="text-danger">{paymentError}</div>}
              </div>

              <hr className="my-4" />

              <button className="w-100 btn btn-primary btn-lg" type="submit">
                {t("reservation.goNextBtn")}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationForm;
