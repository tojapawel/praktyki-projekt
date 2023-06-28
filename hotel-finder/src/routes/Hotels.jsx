import '../App.css';

import React, { useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import E404 from './errors/E404';
import HotelsList from '../components/HotelsList/HotelsList';


const Hotels = () => {
    const [isError, setisError] = useState(false);
    const { city } = useParams();
    const { guests } = useParams();

    const errorHandler = (isError) => {
        setisError(isError);
    }

    if(isError){
        return E404();
    }else{
        return (
            <div className="main_container">
                <HotelsList city={city} guests={guests} isError={errorHandler}/>
                {/* <Link to="/">Powrót do strony głównej</Link> */}
            </div>
        );
    }
}

export default Hotels;
