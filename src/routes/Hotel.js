import '../App.css';

import { Link, useParams } from 'react-router-dom';
import HotelInfo from '../components/HotelInfo/HotelInfo';

const Hotel = () => {

    const { hotelId } = useParams();

    return (
        <div className="main_container">
            <HotelInfo hotelId={hotelId} />
            <Link to="/">Powrót do strony głównej</Link>
        </div>
    );
}

export default Hotel;
