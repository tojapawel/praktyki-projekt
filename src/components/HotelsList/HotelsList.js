import React from "react";
import HotelCard from "../HotelCard/HotelCard";

// eslint-disable-next-line
import styles from "./HotelList.module.css";

import { useTranslation } from 'react-i18next';

const HotelsList = (props) => {
    const { t } = useTranslation();

	if (props.hotels.length === 0) {
		return <h2>Brak hoteli</h2>;
	}

	return (
		<table>
			<thead>
				<tr>
					<th>{t('table.number')}</th>
					<th>{t('table.id')}</th>
					<th>{t('table.name')}</th>
					<th>{t('table.address')}</th>
					<th>{t('table.stars')}</th>
					<th>{t('table.reviewsScore')}</th>
					<th>{t('table.promoted')}</th>
					<th>{t('table.metadata.distanceFromCenter')}</th>
					<th>{t('table.metadata.wifi')}</th>
					<th>{t('table.metadata.parking')}</th>
					<th>{t('table.metadata.pets')}</th>
					<th>{t('table.metadata.roomService')}</th>
					<th>Link</th>
				</tr>
			</thead>
			<tbody>
				{props.hotels.map((hotels, index) => (
					<HotelCard
						key={hotels.id}
						id={hotels.id}
						number={index + 1}
						name={hotels.name}
						location={hotels.location}
						stars={hotels.stars}
						distanceFromCenter={hotels.metadata.distanceFromCenter}
						wifi={hotels.metadata.wifi}
						parking={hotels.metadata.parking}
						pets={hotels.metadata.pets}
						service={hotels.metadata.roomService}
						reviewsScore={hotels.reviewsScore}
						promoted={hotels.promoted}
					/>
				))}
			</tbody>
		</table>
	);

}

export default HotelsList;