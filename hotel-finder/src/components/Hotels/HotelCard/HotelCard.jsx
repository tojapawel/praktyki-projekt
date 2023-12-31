import { useEffect } from "react";

import { MdCampaign, MdCheck, MdClose, MdHelpOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import LeafletMap from "../../LeafletMap/LeafletMap";

import CalculateStars from "../../../functions/calculateStars";

// eslint-disable-next-line
import i18n from "../../../translations/i18n";
import { useTranslation } from "react-i18next";

const HotelCard = (props) => {
  const { t } = useTranslation();

  const hotel = props.hotel;

  const getMinPrice = (rooms) => {
    const prices = rooms.map((room) => room.price);
    return Math.min(...prices);
  };

  const setIcon = (val) => {
    if (val) {
      return (
        <MdCheck className="me-2 text-success" style={{ position: "relative", bottom: "1px" }} />
      );
    }

    return <MdClose className="me-2 text-danger" style={{ position: "relative", bottom: "1px" }} />;
  };

  return (
    <div className="card mb-3">
      <Tooltip anchorSelect=".promotedHotelTT" place="top">
        {t("hotels.hotelCard.tooltip.promoted")}
      </Tooltip>
      <Tooltip anchorSelect=".price" place="top">
        {t("hotels.hotelCard.tooltip.lowestPrice")}
      </Tooltip>
      <div className="row g-0">
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              {hotel.name}

              {hotel.promoted === 1 && (
                <small>
                  <MdCampaign
                    className="mx-2 promotedHotelTT"
                    style={{ position: "relative", bottom: "3px" }}
                  />
                </small>
              )}
            </h5>
            <p className="card-text">
              <small className="text-primary">
                {hotel.city}, {hotel.address}
              </small>
              <i className="bi bi-dot fs-4" style={{ position: "relative", bottom: "-4px" }} />
              <small>
                {hotel.distanceFromCenter} km {t("hotels.hotelCard.toCenter")}
              </small>
            </p>
            <small className="ml-2">
              {t("hotels.filter.metadata.wifi")} {setIcon(hotel.wifi)}
            </small>
            <small className="ml-2">
              {t("hotels.filter.metadata.parking")} {setIcon(hotel.parking)}
            </small>
            <small className="ml-2">
              {t("hotels.filter.metadata.pets")} {setIcon(hotel.pets)}
            </small>
            <small className="ml-2">
              {t("hotels.filter.metadata.roomService")} {setIcon(hotel.roomService)}
            </small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-body text-end">
            <h6>
              {t("hotels.hotelCard.reviewScore")}{" "}
              <span className="badge bg-primary">{hotel.reviewScore}</span>
            </h6>
            <h6>
              <CalculateStars stars={hotel.stars} />
            </h6>
            <h6>
              {getMinPrice(props.rooms)} zł / {t("hotels.hotelCard.night")}{" "}
              <MdHelpOutline style={{ position: "relative", bottom: "1px" }} className="price" />
            </h6>
            <Link to={`/hotel/${hotel.hotel_id}`} type="button" className="btn btn-primary btn-sm">
              {t("hotels.hotelCard.showPrices")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
