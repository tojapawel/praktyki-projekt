import HotelCard from "./HotelCard";

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

      <div className="h-100 col-md-4 sticky-top pt-4">
        <div className="p-5 text-bg-dark rounded-3">
          <h2>Change the background</h2>
          <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
          <button className="btn btn-outline-light" type="button">Example button</button>
        </div>
      </div>

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
