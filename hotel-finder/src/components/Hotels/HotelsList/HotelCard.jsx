import { Link } from 'react-router-dom';

import CalculateStars from "../../../functions/calculateStars";

const HotelCard = (props) => {
    const hotel = props.hotel;

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{hotel.name}</h5>
                        <p className="card-text">
                            <small className="text-primary">{hotel.location.city}, {hotel.location.address}</small>
                            <i className='bi bi-dot fs-4' style={{position: 'relative', bottom: '-4px'}}/>
                            <small>{hotel.metadata.distanceFromCenter} km do centrum</small>
                        </p>
                        <small className="ml-2">Wifi<i className={hotel.metadata.wifi ? 'bi bi-check fs-5 text-success' : 'bi bi-x fs-5 text-danger'} style={{position: 'relative', bottom: '-2px'}} /></small>
                        <small className="mx-2">Parking<i className={hotel.metadata.parking ? 'bi bi-check fs-5 text-success' : 'bi bi-x fs-5 text-danger'} style={{position: 'relative', bottom: '-2px'}} /></small>
                        <small className="mx-2">Zwierzęta<i className={hotel.metadata.pets ? 'bi bi-check fs-5 text-success' : 'bi bi-x fs-5 text-danger'} style={{position: 'relative', bottom: '-2px'}} /></small>
                        <small className="mx-2">Obsługa pokoju<i className={hotel.metadata.roomService ? 'bi bi-check fs-5 text-success' : 'bi bi-x fs-5 text-danger'} style={{position: 'relative', bottom: '-2px'}} /></small>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card-body text-end">
                        <h6>Ocena <span className="badge bg-primary">{hotel.reviewsScore}</span></h6>
                        <h6><CalculateStars stars={hotel.stars}/></h6>
                        <Link to={`/hotel/${props.id}`} type="button" className="mt-4 btn btn-primary btn-sm">Pokaż ceny</Link>
                    </div>
                </div>
            </div>
        </div>

        // TODO: Dodać responsywność
    );
  }
  
  export default HotelCard;
  