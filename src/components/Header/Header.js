import React, { useState, useEffect } from 'react';

import styles from "./Header.module.css";

const Header = (props) => {
	const [city, setCity] = useState('');
	const [stars, setStars] = useState('');

	const [sort, setSort] = useState('');

	useEffect(() => {
		const filtered = props.hotels.filter((hotel) => {
			if (city && hotel.location.city.toLocaleLowerCase() !== city.toLocaleLowerCase()) {
				return false;
			}

			if (stars && hotel.stars != stars) {
				return false;
			}

			return true;
		});

		switch (sort) {
			case "gm":
				filtered.sort((a, b) => b.stars - a.stars);
				break;
			case "gr":
				filtered.sort((a, b) => a.stars - b.stars);
				break;
			case "odcm":
				filtered.sort((a, b) => b.metadata.distanceFromCenter - a.metadata.distanceFromCenter);
				break;
			case "odcr":
				filtered.sort((a, b) => a.metadata.distanceFromCenter - b.metadata.distanceFromCenter);
				break;
			case "na":
				filtered.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case "ma":
				filtered.sort((a, b) => a.location.city.localeCompare(b.location.city));
				break;
			default:

				break;
		}

		filtered.sort((a, b) => {
			if (a.promoted && !b.promoted) {
				return -1;
			}
			if (!a.promoted && b.promoted) {
				return 1;
			}
		});

		props.fiHotels(filtered);

	}, [sort, city, stars, props.hotels]);

	let cities = [...new Set(props.hotels.map(hotel => hotel.location.city))];

	return (
		<div className={styles.header}>
			<label htmlFor='city-input'>Miasto: </label>
			{/* <input id="city-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} /> */}

			<select id="city-select" value={city} onChange={(e) => setCity(e.target.value)} >
				<option value="">Wybierz miasto</option>

				{cities.map((city, index) => (
					<option key={index} value={city}>{city}</option>
				))}
			</select>

			<br />

			<label htmlFor='stars-select'> Ilość gwiazdek: </label>
			<select id="stars-select" value={stars} onChange={(e) => setStars(e.target.value)} >
				<option value="">Wszystkie</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>

			<br />

			<label htmlFor='sort-select'>Sortowanie: </label>
			<select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} >
				<option value="">Wybierz sortowanie</option>
				<option value="" disabled>----------------------------</option>
				<option value="gm">Gwiazdki malejąco</option>
				<option value="gr">Gwiazdki rosnąco</option>
				<option value="" disabled>----------------------------</option>
				<option value="odcm">Odległość do centrum malejąco</option>
				<option value="odcr">Odległość do centrum rosnąco</option>
				<option value="" disabled>----------------------------</option>
				<option value="na">Nazwa hotelu alfabetycznie</option>
				<option value="" disabled>----------------------------</option>
				<option value="ma">Miasto alfabetycznie</option>
				<option value="" disabled>----------------------------</option>
			</select>
		</div>
	);
};

export default Header;
