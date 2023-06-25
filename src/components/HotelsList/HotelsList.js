import React from "react";
import HotelCard from "../HotelCard/HotelCard";

// eslint-disable-next-line
import styles from "./HotelList.module.css";

import { useTranslation } from 'react-i18next';

const HotelsList = (props) => {
	const { t } = useTranslation();

	if (props.hotels.length === 0) {
		return;
	}

	return (
		<div className={styles.hotelslist}>

			{props.hotels.map((hotels) => (
				<HotelCard
					key={hotels.id}
					id={hotels.id}
					name={hotels.name}
					reviewsScore={hotels.reviewsScore}
				/>
			))}

		</div>
	);

}

export default HotelsList;