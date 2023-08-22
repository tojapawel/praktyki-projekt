import React from 'react';

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

function AttractionsRow(props) {
  const { t } = useTranslation();

    return (
      <tr key={props.index}>
        <td>{props.attraction.name}</td>
        {props.attraction.image === null ? <td></td> : <td>{props.attractions[0].image}</td>}
        {props.attraction.quantity === 0 ? <td>{t("hotel.attractions.notAvailable")}</td> : <td>{props.attraction.quantity}</td>}
        <td>{props.attraction.price} zł</td>
        {props.attraction.price_type === "onetime" ? <td>{t("hotel.attractions.priceType.onetime")}</td> : <td>{t("hotel.attractions.priceType.perday")}</td>}
      </tr>
    );

}

export default AttractionsRow;