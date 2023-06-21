import React, { useState, useEffect } from 'react';

import styles from "./Header.module.css";

const Header = (props) => {
	const [city, setCity] = useState('');
	const [stars, setStars] = useState('');

	const [sort, setSort] = useState('');

	const [wifiCheck, setWifiCheck] = useState(false);
	const [parkingCheck, setParkingCheck] = useState(false);
	const [petsCheck, setPetsCheck] = useState(false);
	const [serviceCheck, setServiceCheck] = useState(false);

	const handleReset = () => {
		setCity('');
		setStars('');
		setSort('');
		setWifiCheck(false);
		setParkingCheck(false);
		setPetsCheck(false);
		setServiceCheck(false);
	}

	useEffect(() => {
		const filtered = props.hotels.filter((hotel) => {
			if (city && hotel.location.city.toLocaleLowerCase() !== city.toLocaleLowerCase()) {
				return false;
			}

			if (stars && hotel.stars != stars) {
				return false;
			}

			if (wifiCheck && hotel.metadata.wifi != wifiCheck) {
				return false;
			}

			if (parkingCheck && hotel.metadata.parking != parkingCheck) {
				return false;
			}

			if (petsCheck && hotel.metadata.pets != petsCheck) {
				return false;
			}

			if (serviceCheck && hotel.metadata.roomService != serviceCheck) {
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
			case "om":
				filtered.sort((a, b) => b.reviewsScore - a.reviewsScore);
				break;
			case "or":
				filtered.sort((a, b) => a.reviewsScore - b.reviewsScore);
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


	}, [sort, city, stars, props.hotels, wifiCheck, parkingCheck, petsCheck, serviceCheck]);

	let cities = [...new Set(props.hotels.map(hotel => hotel.location.city))];

	return (
		<div className={styles.header}>
			<label htmlFor='city-input'>Miasto: </label>
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
				<option value="om">Ocena malejąco</option>
				<option value="or">Ocena rosnąco</option>
				<option value="" disabled>----------------------------</option>
				<option value="odcm">Odległość do centrum malejąco</option>
				<option value="odcr">Odległość do centrum rosnąco</option>
				<option value="" disabled>----------------------------</option>
				<option value="na">Nazwa hotelu alfabetycznie</option>
				<option value="" disabled>----------------------------</option>
				<option value="ma">Miasto alfabetycznie</option>
				<option value="" disabled>----------------------------</option>
			</select>

			<br />

			<div className={styles.metadata}>
				<span>Czy hotel ma mieć: </span>
				<div className={styles.item}>
					<label htmlFor='wifi-checkbox'>Wifi: </label>
					<input type="checkbox" id="wifi-checkbox" checked={wifiCheck} name="wifi-checkbox" onChange={(e) => setWifiCheck(e.target.checked)} />
				</div>
				<div className={styles.item}>

					<label htmlFor='parking-checkbox'>Parking: </label>
					<input type="checkbox" id="parking-checkbox" checked={parkingCheck} name="parking-checkbox" onChange={(e) => setParkingCheck(e.target.checked)} />
				</div>
				<div className={styles.item}>

					<label htmlFor='pets-checkbox'>Zwierzęta: </label>
					<input type="checkbox" id="pets-checkbox" checked={petsCheck} name="pets-checkbox" onChange={(e) => setPetsCheck(e.target.checked)} />
				</div>
				<div className={styles.item}>

					<label htmlFor='service-checkbox'>Obługa pokoju: </label>
					<input type="checkbox" id="service-checkbox" checked={serviceCheck} name="service-checkbox" onChange={(e) => setServiceCheck(e.target.checked)} />
				</div>
			</div>

			<button onClick={handleReset}>Resetuj filtry</button>

		</div>
	);
};

export default Header;
