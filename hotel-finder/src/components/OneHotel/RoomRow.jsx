import React from 'react';
import { MdCheck, MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

function RoomRow({ room, hotelId, index }) {
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
          <Link to={`/book/${hotelId}/${index}`}>Rezerwuj</Link>
        ) : (
          <span className="text-secondary">niedostępny</span>
        )}
      </td>
    </tr>
  );
}

export default RoomRow;