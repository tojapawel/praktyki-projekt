import React from 'react';
import styles from "./HotelCard.module.css";

import { Link } from 'react-router-dom';

import calculateStars from '../../functions/calculateStars';

const HotelCard = (props) => {

    let stars = calculateStars(props.stars);

    return (
        <tr>
            <td>{props.number}</td>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.location.postCode}, {props.location.city}, {props.location.address}</td>
            <td className={styles.stars}>{stars}</td>
            <td>{props.reviewsScore}</td>
            <td>
                <input className={styles.box} type="checkbox" checked={props.promoted} />
            </td>
            <td>{props.distanceFromCenter} km</td>
            <td>
                <input className={styles.box} type="checkbox" checked={props.wifi} />
            </td>
            <td>
                <input className={styles.box} type="checkbox" checked={props.parking} />
            </td>
            <td>
                <input className={styles.box} type="checkbox" checked={props.pets} />
            </td>
            <td>
                <input className={styles.box} type="checkbox" checked={props.service} />
            </td>
            <td><Link to={`/hotel/${props.id}`}>Link</Link></td>
            
            
        </tr >
    );
}

export default HotelCard;