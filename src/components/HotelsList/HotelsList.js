import React from "react";
import HotelCard from "../HotelCard/HotelCard";

// eslint-disable-next-line
import styles from "./HotelList.module.css";

const HotelsList = (props) => {

	if (props.hotels.length === 0) {
		return <h2>Brak hoteli</h2>;
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Numer</th>
					<th>ID</th>
					<th>Nazwa</th>
					<th>Adres</th>
					<th>Gwiazdki</th>
					<th>Do centrum</th>
					<th>Wifi</th>
					<th>Parking</th>
					<th>Zwierzeta</th>
					<th>Obsługa pokoju</th>
					<th>Link</th>
				</tr>
			</thead>
			<tbody>
				{props.hotels.map((hotels, index) => (
					<HotelCard
						key={hotels.id}
						id={hotels.id}
						number={index+1}
						name={hotels.name}
						location={hotels.location}
						stars={hotels.stars}
						distanceFromCenter={hotels.metadata.distanceFromCenter}
						wifi={hotels.metadata.wifi}
						parking={hotels.metadata.parking}
						pets={hotels.metadata.pets}
						service={hotels.metadata.service}
					/>
				))}
			</tbody>
		</table>
	);

}

export default HotelsList;