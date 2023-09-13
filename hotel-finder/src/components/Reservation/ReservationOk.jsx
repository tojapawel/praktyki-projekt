import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

const ReservationOK = () => {
  const { t } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();

  const handleButton = () => {
    navigate("/");
  }

  return (
    <>
      <div className="p-5 text-center bg-body-tertiary vertical_center">
        <div className="container py-5">
          <h1 className="text-body-emphasis">{t("reservation.ok.title")}</h1>
          <p className="col-lg-8 mx-auto lead">{t("reservation.ok.info")}</p>
          <button className="btn btn-primary px-5 mb-5" type="button" onClick={handleButton}>{t("reservation.ok.button")}</button>
        </div>
      </div>
    </>
  );
};

export default ReservationOK;
