import '../../App.css';

import styles from "./HotelInfo.module.css";
import hotelsJSON from '../../json/hotels.json';

import calculateStars from "../../functions/calculateStars";
import E404 from '../../routes/errors/E404';

function HotelInfo(props) {

    let hotel = hotelsJSON.filter((hotel) => hotel.id === props.hotelId);

    if (hotel.length === 1) {
        hotel = hotel[0];
        let stars = calculateStars(hotel.stars);

        return (
            <div className="main_container">
                <table>
                    <thead>
                        <tr>
                            <th className={styles.center} colspan="11">Hotel</th>
                        </tr>
                        <tr>
                            <th>ID</th>
                            <th>Nazwa</th>
                            <th>Adres</th>
                            <th>Gwiazdki</th>
                            <th>Ocena</th>
                            <th>Promowany</th>
                            <th>Do centrum</th>
                            <th>Wifi</th>
                            <th>Parking</th>
                            <th>Zwierzeta</th>
                            <th>Obsługa pokoju</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{hotel.id}</td>
                            <td>{hotel.name}</td>
                            <td>{hotel.location.postCode}, {hotel.location.city}, {hotel.location.address}</td>
                            <td className={styles.stars}>{stars}</td>
                            <td>{hotel.reviewsScore}</td>
                            <td>
                                <input className={styles.box} type="checkbox" checked={hotel.promoted} />
                            </td>
                            <td>{hotel.metadata.distanceFromCenter} km</td>
                            <td>
                                <input className={styles.box} type="checkbox" checked={hotel.metadata.wifi} />
                            </td>
                            <td>
                                <input className={styles.box} type="checkbox" checked={hotel.metadata.parking} />
                            </td>
                            <td>
                                <input className={styles.box} type="checkbox" checked={hotel.metadata.pets} />
                            </td>
                            <td>
                                <input className={styles.box} type="checkbox" checked={hotel.metadata.service} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className={styles.table_padding}>
                    <thead>
                        <tr>
                            <th className={styles.center} colspan="8">Pokoje</th>
                        </tr>
                        <tr>
                            <th>Numer</th>
                            <th>Cena</th>
                            <th>Max gości</th>
                            <th>Łóżka</th>
                            <th>Pokój rodzinny</th>
                            <th>Powierzchnia</th>
                            <th>Śniadania</th>
                            <th>Dostępny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotel.rooms.map((room, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{room.price} zł</td>
                                <td>{room.maxGuests}</td>
                                <td>{room.beds}</td>
                                <td>
                                    <input className={styles.box} type="checkbox" checked={room.familyRoom} />
                                </td>
                                <td>{room.area} m<sup>2</sup></td>
                                <td>
                                    <input className={styles.box} type="checkbox" checked={room.breakfast} />
                                </td>
                                <td>
                                    <input className={styles.box} type="checkbox" checked={room.available} />
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

export default HotelInfo;
