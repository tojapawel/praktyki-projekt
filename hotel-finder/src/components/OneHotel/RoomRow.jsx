import React from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

function RoomRow({ room, hotelId, index }) {
  const { t } = useTranslation();

  const setBool = (val) => {
    if (val) {
      return (
        <MdCheck className="me-2 text-success" style={{ position: "relative", bottom: "1px" }} />
      );
    }
    return <MdClose className="me-2 text-danger" style={{ position: "relative", bottom: "1px" }} />;
  };

  return (
    <tr key={index}>
      <td>{room.price} zł</td>
      <td>{room.maxGuests}</td>
      <td>{room.beds}</td>
      <td>{setBool(room.familyRoom)}</td>
      <td>
        {room.area} m<sup>2</sup>
      </td>
      <td>{setBool(room.breakfast)}</td>
      <td>{setBool(room.available)}</td>
      <td>
        {room.available ? (
          <Link to={`/book/${hotelId}/${room.price}${room.beds}${room.area}${room.maxGuests}`}>{t("hotel.roomRow.book")}</Link>
        ) : (
          <span className="text-secondary">{t("hotel.roomRow.unAvailable")}</span>
        )}
      </td>
    </tr>
  );
}

export default RoomRow;