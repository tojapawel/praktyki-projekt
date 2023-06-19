import React, { useState } from 'react';
import HotelsFilter from '../HotelsFilter/HotelsFilter';
import HotelsList from '../HotelsList/HotelsList';

const Hotels = (props) => {
	const [filteredStars, setFilteredStars] = useState('5');

	const filterChangeHandler = (selectedStars) => {
		setFilteredStars(selectedStars);
	};

	const filteredHotels = props.items.filter(hotels => {
		return hotels.stars == filteredStars;
	});

	return (
		<>
			<HotelsFilter
				selected={filteredStars}
				onChangeFilter={filterChangeHandler}
			/>

			<HotelsList items={filteredHotels}></HotelsList>
		</>
	);
};

export default Hotels;
