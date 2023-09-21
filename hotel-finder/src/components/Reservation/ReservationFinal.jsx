import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";
import fetchData from "../../functions/fetchData";

const ReservationFinal = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const rawData = searchParams.get("data") || "No data";
  var data = JSON.parse(rawData);

  const handlePayment = () => {
    fetchData("changeavailable", `${data[9]}/0`);
    fetchData(
      "addreservation",
      `${data[0]}/${data[1]}/${data[2]}/${data[3]}/${data[4]}/${data[5]}/${data[6]}/${data[7]}/${
        data[8]
      }/${data[9]}/${data[10]}/${data[11].split("T")[0]}/${data[12].split("T")[0]}/${
        data[13].split("T")[0]
      }`
    );

    localStorage.removeItem("arrivalDate");
    localStorage.removeItem("departueDate");
    // TODO: odejmowanie z bazy danych użycie kodu jeżeli kod został wykorzystany przy danej rezerwacji
    // TODO: wysyłanie maila z potwierdzeniem rezerwacji
    // TODO: strona do której wchodzi się z linka z maila, na której są informacje o rezerwacji
    navigate("/reservation/ok");
  };

  return (
    <>
      <div className="p-5 text-center bg-body-tertiary vertical_center">
        <div className="container py-5">
          <h1 className="text-body-emphasis">{t("reservation.payment.payment")}</h1>
          <p className="col-lg-8 mx-auto lead">{t("reservation.payBelow")}</p>
          <button className="btn btn-primary px-5 mb-5" type="button" onClick={handlePayment}>
            {t("reservation.pay")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReservationFinal;
