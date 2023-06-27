import '../App.css';

import React, { useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import HotelInfo from '../components/HotelInfo/HotelInfo';
import E404 from './errors/E404';

const Hotel = () => {
    const [isError, setisError] = useState(false);
    const { hotelId } = useParams();

    const errorHandler = (isError) => {
        setisError(isError);
    }

    if(isError){
        return E404();
    }else{
        return (
            <div className="main_container">
                <HotelInfo hotelId={hotelId} isError={errorHandler}/>
                <Link to="/">Powrót do strony głównej</Link>
            </div>
        );
    }
}

export default Hotel;
