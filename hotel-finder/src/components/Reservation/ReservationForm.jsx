import {
    MdHome
} from "react-icons/md";
  
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
  
// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

import CryptoJS from 'crypto-js';
  
const ReservationForm = (props) => {
    const { t } = useTranslation();

    const [daysCount, setDaysCount] = useState(0);
    const [arrivalDate, setArrivalDate] = useState();
    const [departueDate, setDepartueDate] = useState();
    const [dateError, setDateError] = useState("");

    const [promo, setPromo] = useState(0);
    const [promoCode, setPromoCode] = useState(null);
    const [promoCodeShow, setPromoCodeShow] = useState(null);
    const [promoCodeHash, setPromoCodeHash] = useState(null);
    const [promoError, setPromoError] = useState(false);

    const [price, setPrice] = useState(0);
 
    const hotel = props.hotel[0];
    const room = props.room[0];

    useEffect(() => {
        var today = new Date();

        if(departueDate > 0 && arrivalDate > 0){
            if (today <= arrivalDate || today <= departueDate) {
                if(departueDate > arrivalDate){
                    setDaysCount((departueDate - arrivalDate) / (1000 * 60 * 60 * 24));
                }else{
                    setDaysCount(0);
                    setDateError("Data wyjazdu nie może być wcześniejsza niż data wyjazdu.");
                }
            }else{
                setDaysCount(0);
                setDateError("Data wyjazdu nie może być wcześniejsza niż data wyjazdu.");
            }      
        }
    }, [arrivalDate, departueDate]);

    useEffect(() => {
        setPrice((daysCount*room.price) - (daysCount*room.price)*promo/100);
    }, [daysCount, promo]);

    useEffect(() => {
        setPromoCodeHash(CryptoJS.SHA256(promoCode).toString(CryptoJS.enc.Hex));
    }, [promoCode]);

    const handlePromoCode = () => {
        setPromoCodeShow(promoCode);

        const foundCode = props.codes.find(item => item.code === promoCodeHash);

        if (foundCode) {
            setPromo(foundCode.value);
            setPromoError(false);
        }else{
            setPromo(0);
            setPromoError(true);
        }
    }

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
                    <h2>Rezerwacja pokoju</h2>
                    <p className="lead" >{t("reservation.main.info")} {hotel.name}, <b>{hotel.city}</b></p>
                </div>
    

                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Podsumowanie</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Ilość dni</h6>
                                </div>
                                <span className="text-body-secondary">{daysCount}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Cena za noc w pokoju</h6>
                                </div>
                                <span className="text-body-secondary">{room.price} zł</span>
                            </li>

                            {promo !== 0 && (
                                <>
                                    <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
                                        <div className="text-success">
                                            <h6 className="my-0">Kod promocyjny</h6>
                                            <small>{promoCodeShow}</small>
                                        </div>
                                        <span className="text-success">−{promo} %</span>
                                    </li>
                                </>
                            )}

                            <li className="list-group-item d-flex justify-content-between">
                                <span>Razem</span>
                                <strong>{price.toFixed(2)} zł</strong>
                            </li>
                        </ul>

                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Kod promocyjny" onChange={(e) => setPromoCode(e.target.value)}/>
                            <button className="btn btn-secondary" onClick={handlePromoCode}>Zatwierdź</button>        
                        </div>

                        {
                            promoError &&
                            <div className="text-danger">
                                Kod rabatowy <strong>{promoCodeShow}</strong> jest niepoprawny.
                            </div>
                        }
                    </div>
                    <div className="col-md-7 col-lg-8">

                        <hr className="my-4" />

                        <h4 className="mb-3">Informacje o pobycie</h4>

                        <div className="my-3">
                            <div className="row">
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="date" className="form-control" id="arrivalDate" onChange={(e) => setArrivalDate(new Date(e.target.value))}/>
                                        <label htmlFor="arrivalDate">{t("main.input.date.arrival")}</label>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-floating mb-3">
                                        <input type="date" className="form-control" id="departueDate" onChange={(e) => setDepartueDate(new Date(e.target.value))}/>
                                        <label htmlFor="departueDate">{t("main.input.date.departure")}</label>
                                    </div>
                                </div>
                            </div>
                            {
                                dateError != "" &&
                                    <div className="text-danger">
                                        Data wyjazdu nie może być wcześniejsza niż data wyjazdu.
                                    </div>
                            }
                        </div>

                        <hr className="my-4" />

                        <h4 className="mb-3">Dane do faktury</h4>
                        <form className="needs-validation">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">Imie</label>
                                    <input type="text" className="form-control" id="firstName" />
                                    <div className="invalid-feedback">
                                        Valid first name is required.
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Nazwisko</label>
                                    <input type="text" className="form-control" id="lastName" />
                                    <div className="invalid-feedback">
                                        Valid last name is required.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address htmlFor shipping updates.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Adres</label>
                                    <input type="text" className="form-control" id="address" placeholder="Ulica i numer domu" />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address2" className="form-label">Adres 2 <span className="text-body-secondary">(Opcjonalnie)</span></label>
                                    <input type="text" className="form-control" id="address2" placeholder="Numer mieszkania" />
                                </div>

                                <div className="col-8">
                                    <label htmlFor="city" className="form-label">Miejscowość</label>
                                    <input type="text" className="form-control" id="city"/>
                                </div>

                                <div className="col-4">
                                    <label htmlFor="zip" className="form-label">Kod pocztowy</label>
                                    <input type="text" className="form-control" id="zip" placeholder="XX-XXX" />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Płatność</h4>

                            <div className="my-3">
                                <div className="form-check">
                                    <input id="card" name="paymentMethod" type="radio" className="form-check-input" />
                                    <label className="form-check-label" htmlFor="card">Karta <span className="text-body-secondary">(VISA / MASTERCARD)</span></label>
                                </div>
                                <div className="form-check">
                                    <input id="quicktransfer" name="paymentMethod" type="radio" className="form-check-input"/>
                                    <label className="form-check-label" htmlFor="quicktransfer">Szybki przelew <span className="text-body-secondary">(PayU)</span></label>
                                </div>
                                <div className="form-check">
                                    <input id="transfer" name="paymentMethod" type="radio" className="form-check-input"/>
                                    <label className="form-check-label" htmlFor="transfer">Tradycyjny przelew</label>
                                </div>
                                <div className="form-check">
                                    <input id="blik" name="paymentMethod" type="radio" className="form-check-input" />
                                    <label className="form-check-label" htmlFor="blik">Blik</label>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit">Przejdź do płatności</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>


    );
};
  
export default ReservationForm;
  