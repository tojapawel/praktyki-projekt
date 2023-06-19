import React, { useState, useEffect } from 'react';

const HotelsFilter = (props) => {

    

	return (
		<>
			<input
				type="text"
				value={cityInput}
				onChange={handleInputChange}
			/>
		</>
	);
}

export default HotelsFilter;