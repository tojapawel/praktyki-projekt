import React from 'react';
import styles from "./HotelCard.module.css";

function calculateStars(stars){
    let starshtml = "";

    for (let i = 0; i < stars; i++) {
        starshtml += '★';
    }

    for (let i = 0; i < 5-stars; i++) {
        starshtml += '☆';
    }

    return starshtml;
}

const HotelCard = (props) => {

    let stars = calculateStars(props.stars);

    return (
        <tr>
            <td>{props.number}</td>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.location.postCode}, {props.location.city}, {props.location.address}</td>
            <td className={styles.stars}>{stars}</td>
        </tr>
    );
}

export default HotelCard;