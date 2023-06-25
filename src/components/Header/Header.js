import React, { useState, useEffect } from 'react';

import styles from "./Header.module.css";

import LanguageSelector from '../../translations/LanguageSelector';
// eslint-disable-next-line
import i18n from "../../translations/i18n"

import { useTranslation } from 'react-i18next';

const Header = (props) => {
	const { t } = useTranslation();

	const [city, setCity] = useState('');
	const [stars, setStars] = useState('');
	const [score, setScore] = useState("");

	const [sort, setSort] = useState('');

	const [wifiCheck, setWifiCheck] = useState(false);
	const [parkingCheck, setParkingCheck] = useState(false);
	const [petsCheck, setPetsCheck] = useState(false);
	const [serviceCheck, setServiceCheck] = useState(false);

	const [guests, setGuests] = useState("");
	const [breakfast, setBreakfast] = useState("");

	const [submitCheck, setSubmitCheck] = useState(false);

	const [filtered, setFiltered] = useState([]);

	const handleReset = () => {
		setCity('');
		setStars('');
		setSort('');
		setWifiCheck(false);
		setParkingCheck(false);
		setPetsCheck(false);
		setServiceCheck(false);
		setGuests('');
		setScore('');
		setBreakfast('');
		setSubmitCheck(true);
		props.fiHotels([]);
		setFiltered([]);
	}

	const handleSubmitF = () => {
		props.fiHotels(filtered);
		setSubmitCheck(true);
	}

	useEffect(() => {
		setFiltered(props.hotels.filter((hotel) => {
			if (city && hotel.location.city.toLocaleLowerCase() !== city.toLocaleLowerCase()) {
				return false;
			}

			if (score && hotel.reviewsScore < score) {
				return false;
			}

			if (stars && hotel.stars != stars) {
				return false;
			}

			if (wifiCheck && hotel.metadata.wifi !== wifiCheck) {
				return false;
			}

			if (parkingCheck && hotel.metadata.parking !== parkingCheck) {
				return false;
			}

			if (petsCheck && hotel.metadata.pets !== petsCheck) {
				return false;
			}

			if (serviceCheck && hotel.metadata.roomService !== serviceCheck) {
				return false;
			}

			if (breakfast && (hotel.rooms.some((room) => room.breakfast === true) !== breakfast)) {
				return false;
			}

			if (guests && (hotel.rooms.some((room) => room.maxGuests >= parseInt(guests)) === false)) {
				return false;
			}

			return true;
		}));

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
		
		setSubmitCheck(false);

	}, [submitCheck, filtered]);

	let cities = [...new Set(props.hotels.map(hotel => hotel.location.city))];

	return (
		<div className={styles.header}>
			<label htmlFor='city-input'>{t('header.city')}: </label>
			<select id="city-select" value={city} onChange={(e) => setCity(e.target.value)} >
				<option value="">{t('header.main.all')}</option>

				{cities.map((city, index) => (
					<option key={index} value={city}>{city}</option>
				))}
			</select>

			<br />

			<label htmlFor='stars-select'>{t('header.starsCount')}: </label>
			<select id="stars-select" value={stars} onChange={(e) => setStars(e.target.value)} >
				<option value="">{t('header.main.all')}</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>

			<br />

			<label htmlFor='sort-select'>{t('header.sorting.sort')}: </label>
			<select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} >
				<option value="">{t('header.sorting.type.selectSort')}</option>
				<option value="" disabled>----------------------------</option>
				<option value="gm">{t('header.sorting.type.starsDescending')}</option>
				<option value="gr">{t('header.sorting.type.starsAscending')}</option>
				<option value="" disabled>----------------------------</option>
				<option value="om">{t('header.sorting.type.ratingDescending')}</option>
				<option value="or">{t('header.sorting.type.ratingAscending')}</option>
				<option value="" disabled>----------------------------</option>
				<option value="odcm">{t('header.sorting.type.distanceToCenterDescending')}</option>
				<option value="odcr">{t('header.sorting.type.distanceToCenterAscending')}</option>
				<option value="" disabled>----------------------------</option>
				<option value="na">{t('header.sorting.type.hotelNameAlphabetically')}</option>
				<option value="" disabled>----------------------------</option>
				<option value="ma">{t('header.sorting.type.cityAlphabetically')}</option>
				<option value="" disabled>----------------------------</option>
			</select>

			<br />

			<div className={styles.metadata}>
				<span>{t('header.hotelMustHave')}: </span>
				<div className={styles.item}>
					<label htmlFor='wifi-checkbox'>{t('table.metadata.wifi')}: </label>
					<input type="checkbox" id="wifi-checkbox" checked={wifiCheck} name="wifi-checkbox" onChange={(e) => setWifiCheck(e.target.checked)} />
				</div>
				<div className={styles.item}>

					<label htmlFor='parking-checkbox'>{t('table.metadata.parking')}: </label>
					<input type="checkbox" id="parking-checkbox" checked={parkingCheck} name="parking-checkbox" onChange={(e) => setParkingCheck(e.target.checked)} />
				</div>
				<div className={styles.item}>

					<label htmlFor='pets-checkbox'>{t('table.metadata.pets')}: </label>
					<input type="checkbox" id="pets-checkbox" checked={petsCheck} name="pets-checkbox" onChange={(e) => setPetsCheck(e.target.checked)} />
				</div>
				<div className={styles.item}>

					<label htmlFor='service-checkbox'>{t('table.metadata.roomService')}: </label>
					<input type="checkbox" id="service-checkbox" checked={serviceCheck} name="service-checkbox" onChange={(e) => setServiceCheck(e.target.checked)} />
				</div>
			</div>

			<label htmlFor='guests-input'>{t('header.guests')}: </label>
			<input id="guests-select" type='number' min="1" value={guests} onChange={(e) => setGuests(e.target.value)} />

			<label htmlFor='score-input'> {t('header.main.min')} {t('table.reviewsScore').toLocaleLowerCase()}: </label>
			<input id="score-select" type='number' min="0" max="10" value={score} onChange={(e) => setScore(e.target.value)} />

			<label htmlFor='breakfast-checkbox'> {t('table.room.breakfast')}: </label>
			<input type="checkbox" id="breakfast-checkbox" checked={breakfast} name="service-checkbox" onChange={(e) => setBreakfast(e.target.checked)} />

			<br /><br />

			<button onClick={handleReset}>{t('header.resetButton')}</button>
			<button onClick={handleSubmitF}>{t('header.searchButton')}</button>

			<div className={styles.langChange}>
				<span>{t('header.changeLanguage')}: </span><LanguageSelector />
			</div>

		</div>
	);
};

export default Header;