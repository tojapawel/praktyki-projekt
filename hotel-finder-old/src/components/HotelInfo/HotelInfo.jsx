import { useState, useEffect } from "react";

import "../../App.css";

import styles from "./HotelInfo.module.css";
// import hotelsJSON from '../../json/hotels.json';

import calculateStars from "../../functions/calculateStars";

import { useTranslation } from "react-i18next";

import fetchData from "../../functions/fetchData";

const HotelInfo = (props) => {
  const { t } = useTranslation();

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDataFunc = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    fetchDataFunc();
  }, []);

  if (data.length >= 1) {
    let hotel = data.filter((hotel) => hotel.id === props.hotelId);
    if (hotel.length === 1) {
      hotel = hotel[0];
      let stars = calculateStars(hotel.stars);

      return (
        <div className="main_container">
          <table>
            <thead>
              <tr>
                <th className={styles.center} colSpan="11">
                  Hotel
                </th>
              </tr>
              <tr>
                <th>{t("table.id")}</th>
                <th>{t("table.name")}</th>
                <th>{t("table.address")}</th>
                <th>{t("table.stars")}</th>
                <th>{t("table.reviewsScore")}</th>
                <th>{t("table.promoted")}</th>
                <th>{t("table.metadata.distanceFromCenter")}</th>
                <th>{t("table.metadata.wifi")}</th>
                <th>{t("table.metadata.parking")}</th>
                <th>{t("table.metadata.pets")}</th>
                <th>{t("table.metadata.roomService")}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{hotel.id}</td>
                <td>{hotel.name}</td>
                <td>
                  {hotel.location.postCode}, {hotel.location.city},{" "}
                  {hotel.location.address}
                </td>
                <td className={styles.stars}>{stars}</td>
                <td>{hotel.reviewsScore}</td>
                <td>
                  <input
                    className={styles.box}
                    type="checkbox"
                    defaultChecked={hotel.promoted}
                  />
                </td>
                <td>{hotel.metadata.distanceFromCenter} km</td>
                <td>
                  <input
                    className={styles.box}
                    type="checkbox"
                    defaultChecked={hotel.metadata.wifi}
                  />
                </td>
                <td>
                  <input
                    className={styles.box}
                    type="checkbox"
                    defaultChecked={hotel.metadata.parking}
                  />
                </td>
                <td>
                  <input
                    className={styles.box}
                    type="checkbox"
                    defaultChecked={hotel.metadata.pets}
                  />
                </td>
                <td>
                  <input
                    className={styles.box}
                    type="checkbox"
                    defaultChecked={hotel.metadata.service}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <table className={styles.table_padding}>
            <thead>
              <tr>
                <th className={styles.center} colSpan="8">
                  Pokoje
                </th>
              </tr>
              <tr>
                <th>{t("table.number")}</th>
                <th>{t("table.room.price")}</th>
                <th>{t("table.room.maxGuests")}</th>
                <th>{t("table.room.beds")}</th>
                <th>{t("table.room.familyRoom")}</th>
                <th>{t("table.room.area")}</th>
                <th>{t("table.room.breakfast")}</th>
                <th>{t("table.room.available")}</th>
              </tr>
            </thead>
            <tbody>
              {hotel.rooms.map((room, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{room.price} zł</td>
                  <td>{room.maxGuests}</td>
                  <td>{room.beds}</td>
                  <td>
                    <input
                      className={styles.box}
                      type="checkbox"
                      defaultChecked={room.familyRoom}
                    />
                  </td>
                  <td>
                    {room.area} m<sup>2</sup>
                  </td>
                  <td>
                    <input
                      className={styles.box}
                      type="checkbox"
                      defaultChecked={room.breakfast}
                    />
                  </td>
                  <td>
                    <input
                      className={styles.box}
                      type="checkbox"
                      defaultChecked={room.available}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      props.isError(true);
      return;
    }
  }
};

export default HotelInfo;
