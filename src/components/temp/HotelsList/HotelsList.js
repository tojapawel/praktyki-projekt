import React from "react";
import HotelCard from "../HotelCard/HotelCard";

// eslint-disable-next-line
import styles from "./HotelList.module.css";

const HotelsList = (props) => {

	if (props.items.length === 0) {
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
				</tr>
			</thead>
			<tbody>
				{props.items.map((hotels, index) => (
					<HotelCard
						key={hotels.id}
						id={hotels.id}
						number={index+1}
						name={hotels.name}
						location={hotels.location}
						stars={hotels.stars}
						rooms={hotels.rooms}
					/>
				))}
			</tbody>
		</table>
	);

}

export default HotelsList;