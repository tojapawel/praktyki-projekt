import '../App.css';

import { Link, useParams } from 'react-router-dom';

function Hotel() {

    const { hotelId } = useParams();

    return (
        <div className="main_container">
                <p>Hotel</p>
                <p>Identyfikator hotelu: {hotelId}</p>

                <Link to="/">Powrót do strony głównej</Link>
        </div>
    );
}

export default Hotel;
