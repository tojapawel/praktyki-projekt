import React, { useState, useEffect } from 'react';

import styles from "./Header.module.css";

const Header = (props) => {
	const [location, setLocation] = useState('');

	const handleLocationChange = (event) => {
		setLocation(event.target.value);
	};

	useEffect(() => {
		if (location.length != 0) {
			const filtered = props.hotels.filter((item) => item.location.city == location.toString());
			props.fiHotels(filtered);
		}else{
			props.fiHotels(props.hotels);
		}
	}, [location, props.hotels]);

	return (
		<div className={styles.header}>
			<input type="text" value={location} onChange={handleLocationChange} placeholder="miasto" />
		</div>
	);
}

export default Header;