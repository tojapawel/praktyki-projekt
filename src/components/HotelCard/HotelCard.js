import React from 'react';
import styles from "./HotelCard.module.css";

import { Link } from 'react-router-dom';

import img from "../../assets/img/img_placeholder.jpg";
import { MdNavigateNext  } from 'react-icons/md';

import calculateStars from '../../functions/calculateStars';

const HotelCard = (props) => {

    let stars = calculateStars(props.stars);

    return (
        <div className={styles.hotel}>
            <Link to={`/hotel/${props.id}`}>
                <div className={styles.top} style={{ backgroundImage: `url(${img})` }}></div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <span className={styles.name}>{props.name}</span>
                        <span className={styles.price}>DO DODANIA / noc</span>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.score}>
                            <div>{props.reviewsScore}</div>
                        </div>
                        <div className={styles.arrow}>
                            <MdNavigateNext size={24} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCard;