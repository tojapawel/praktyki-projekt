import React, { useState, useEffect } from 'react';

import styles from "./Header.module.css";

const Header = (props) => {
	const [city, setCity] = useState('');
	const [stars, setStars] = useState('');

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

		props.fiHotels(filtered);
	}, [city, stars, props.hotels]);

	return (
		<div className={styles.header}>
			<label htmlFor='city-input'>Miasto: </label>
			<input id="city-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} />

			<label htmlFor='stars-select'> Ilość gwiazdek: </label>
			<select id="stars-select" value={stars} onChange={(e) => setStars(e.target.value)} >
				<option value="">Wszystkie</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
		</div>
	);
};

export default Header;
