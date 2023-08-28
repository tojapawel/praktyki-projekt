const addReservation = async (firstName, lastName, email, address, address2, city, zip, payment, hotel_id, room_id, price, arrival_date, departue_date, reservation_date) => {
  const API_KEY = "sUdwM2xbtu";

  try {
    const response = await fetch(`http://hassioustka.duckdns.org:3355/addReservation/${API_KEY}/${firstName}/${lastName}/${email}/${address}/${address2}/${city}/${zip}/${payment}/${hotel_id}/${room_id}/${price}/${arrival_date}/${departue_date}/${reservation_date}/`);
    const data = await response.json();
  } catch (error) {
    console.log("Error:", error);
  }
};

export default addReservation;
