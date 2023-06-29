import HotelCard from "./HotelCard";
import HotelFilter from "./HotelFilter";

const HotelsList = (props) => {
  return (
    <div className="container py-4">

    <div className="p-5 mb-4 text-bg-dark rounded-3">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Hotel finder</h1>
        <p className="col-md-8 fs-4">Poniżej znajdują się hotele, które spełniają Twoje wymagania.</p>
      </div>
    </div>

    <div className="row align-items-md-stretch">

      <HotelFilter />

      <div className="col-md-8  pt-4">

        {props.hotels.map((hotel, index) => (
          <HotelCard hotel={hotel} key={index}/>
        ))}

      </div>
    </div>

  </div>
  );
}

export default HotelsList;
