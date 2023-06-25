import GridCard from '../UI/Card/Card';

import styles from "./Cities.module.css"

function Cities(props) {
    let cities = [...new Set(props.hotels.map(hotel => hotel.location.city))];

    return (
        <div className={styles.cities}>
            {cities.map((city, index) => (
				<GridCard>
                    {city}
                    sadjhasd
                    <img src="https://placehold.co/600x400"></img>
                </GridCard>
		    ))}
        </div>
    );
}

export default Cities;
