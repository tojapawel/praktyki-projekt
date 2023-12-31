import { MdPets, MdWifi, MdDirectionsCar, MdCleaningServices, MdHome } from "react-icons/md";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line
import i18n from "../../translations/i18n";
import { useTranslation } from "react-i18next";

import CalculateStars from "../../functions/calculateStars";
import RoomRow from "./RoomRow";
import LeafletMap from "../LeafletMap/LeafletMap";
import AttractionsRow from "./AttractionsRow";

import fetchData from "../../functions/fetchData";
import StarRating from "../../functions/StarRating/starRating";

const OneHotel = (props) => {
  const { t } = useTranslation();
  const [available, setAvailable] = useState(false);

  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentComment, setCommentComment] = useState("");
  const [commentStars, setCommentStars] = useState(0);
  const [comments, setComments] = useState("");

  const [attractions, setAttractions] = useState([0]);

  const fetchCommentsFunc = async () => {
    const fetchedComments = await fetchData("comments", props.hotelId);
    setComments(fetchedComments);
  };

  const fetchAttractionsFunc = async () => {
    const fetchedAttractions = await fetchData("getattractions", props.hotelId);
    setAttractions(fetchedAttractions);
  };

  useEffect(() => {
    fetchCommentsFunc();
    fetchAttractionsFunc();
  }, []);

  const setMetadataColor = (val) => {
    if (val) {
      return "text-success";
    }
    return "text-danger";
  };

  const handleGetStars = (stars) => {
    setCommentStars(stars);
    console.log(stars);
  };

  const setMetadataText = (val, type) => {
    if (val) {
      switch (type) {
        case "wifi":
          return t("hotel.metadata.true.wifi");
        case "parking":
          return t("hotel.metadata.true.parking");
        case "pets":
          return t("hotel.metadata.true.pets");
        case "roomService":
          return t("hotel.metadata.true.roomService");
        default:
          break;
      }
    } else {
      switch (type) {
        case "wifi":
          return t("hotel.metadata.false.wifi");
        case "parking":
          return t("hotel.metadata.false.parking");
        case "pets":
          return t("hotel.metadata.false.pets");
        case "roomService":
          return t("hotel.metadata.false.roomService");
        default:
          break;
      }
    }
  };

  let hotel = props.hotel;
  let rooms = props.rooms;
  const handleAddComment = (hotelid) => {
    let now = new Date();
    let created_at = `${now.getDate()}.${
      now.getMonth() + 1
    }.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;
    fetchData(
      "addcomment",
      `${hotelid}/${commentAuthor}/${commentComment}/${commentStars}/${created_at}`
    );
    fetchCommentsFunc();
    setCommentAuthor("");
    setCommentComment("");
    setCommentStars(0);
  };

  return (
    <div className="container" id="top">
      <div className="container px-4 mt-5">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={"/"} className="link-body-emphasis" href="#">
                  <MdHome style={{ position: "relative", bottom: "2px" }} />
                  <span className="visually-hidden">Strona główna</span>
                </Link>
              </li>
              <li className="breadcrumb-item">
                <Link
                  to={"/hotels"}
                  className="link-body-emphasis fw-semibold text-decoration-none"
                  href="#">
                  {t("main.breadcrumbs.hotels")}
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {hotel[0].name}
              </li>
            </ol>
          </nav>
        </div>

        <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
          <div className="col d-flex flex-column align-items-start gap-2">
            <h2 className="fw-bold text-body-emphasis">{hotel[0].name}</h2>
            <p className="text-primary">
              {hotel[0].city} ({hotel[0].code}), {hotel[0].address}
            </p>
          </div>

          <div className="col text-center">
            <div className="row row-cols-1 row-cols-sm-2 g-4">
              <div className="col d-flex flex-column gap-2">
                <h4 className="fw-semibold mb-0 text-body-emphasis">
                  {t("hotel.distanceFromCenter")}
                </h4>
                <p className="text-body-secondary fs-4">{hotel[0].distanceFromCenter} km</p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <h4 className="fw-semibold mb-0 text-body-emphasis">
                  {t("hotels.filter.stars.starsCount")}
                </h4>
                <p className="text-body-secondary fs-4">
                  <CalculateStars stars={hotel[0].stars} />
                </p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <h4 className="fw-semibold mb-0 text-body-emphasis">
                  {t("hotels.hotelCard.reviewScore")}
                </h4>
                <p className="text-body-secondary fs-4">{hotel[0].reviewScore} / 10</p>
              </div>

              <div className="col d-flex flex-column gap-2">
                <h4 className="fw-semibold mb-0 text-body-emphasis">{t("hotel.roomCount")}</h4>
                <p className="text-body-secondary fs-4">{rooms.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5 px-4">
        <LeafletMap city={hotel[0].city} />
      </div>

      <h2 className="mt-5 pb-2 mx-4 border-bottom text-dark">{t("hotel.utilities")}</h2>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 py-5">
        <div className="col d-flex align-items-start">
          <svg
            className="bi text-body-secondary flex-shrink-0 me-3"
            width="1.75em"
            height="1.75em"></svg>
          <div>
            <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel[0].wifi)}`}>
              {t("hotels.filter.metadata.wifi")}{" "}
              <MdWifi style={{ position: "relative", bottom: "2px" }} />
            </h3>
            <p>{setMetadataText(hotel[0].wifi, "wifi")}</p>
          </div>
        </div>

        <div className="col d-flex align-items-start">
          <svg
            className="bi text-body-secondary flex-shrink-0 me-3"
            width="1.75em"
            height="1.75em"></svg>
          <div>
            <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel[0].parking)}`}>
              {t("hotels.filter.metadata.parking")}{" "}
              <MdDirectionsCar style={{ position: "relative", bottom: "2px" }} />
            </h3>
            <p>{setMetadataText(hotel[0].parking, "parking")}</p>
          </div>
        </div>
        <div className="col d-flex align-items-start">
          <svg
            className="bi text-body-secondary flex-shrink-0 me-3"
            width="1.75em"
            height="1.75em"></svg>
          <div>
            <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel[0].pets)}`}>
              {t("hotels.filter.metadata.pets")}{" "}
              <MdPets style={{ position: "relative", bottom: "2px" }} />
            </h3>
            <p>{setMetadataText(hotel[0].pets, "pets")}</p>
          </div>
        </div>
        <div className="col d-flex align-items-start">
          <svg
            className="bi text-body-secondary flex-shrink-0 me-3"
            width="1.75em"
            height="1.75em"></svg>
          <div>
            <h3 className={`fw-bold mb-0 fs-4 ${setMetadataColor(hotel[0].roomService)}`}>
              {t("hotels.filter.metadata.roomService")}{" "}
              <MdCleaningServices style={{ position: "relative", bottom: "2px" }} />
            </h3>
            <p>{setMetadataText(hotel[0].roomService, "roomService")}</p>
          </div>
        </div>
      </div>

      <div className="mt-5 pb-2 mx-4 text-dark border-bottom">
        <h2>{t("hotel.rooms.rooms")}</h2>
        <input
          className="form-check-input"
          type="checkbox"
          checked={available}
          id="available"
          onChange={(e) => setAvailable(e.target.checked)}
        />
        <label className="form-check-label ms-2" htmlFor="available">
          {t("hotels.filter.room.onlyAvailable")}
        </label>
      </div>

      <div className="table-responsive mx-4">
        <table className="table text-center table-striped table-hover">
          <thead>
            <tr>
              <th>{t("hotels.filter.price.price")}</th>
              <th>{t("main.input.guests")}</th>
              <th>{t("hotel.rooms.beds")}</th>
              <th>{t("hotel.rooms.familyRoom")}</th>
              <th>{t("hotel.rooms.area")}</th>
              <th>{t("hotels.filter.room.breakfast")}</th>
              <th>{t("hotel.rooms.available")}</th>
              <th>{t("hotel.rooms.reservation")}</th>
            </tr>
          </thead>
          <tbody>
            {available === true && rooms.filter((room) => room.available === 1).length === 0 && (
              <tr>
                <th colSpan="8">{t("hotel.noAvailableHotels")}</th>
              </tr>
            )}

            {available === true
              ? rooms
                  .filter((room) => room.available === 1)
                  .map((room, index) => (
                    <RoomRow key={index} room={room} hotelId={props.hotelId} index={index} />
                  ))
              : rooms.map((room, index) => (
                  <RoomRow key={index} room={room} hotelId={props.hotelId} index={index} />
                ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 pb-2 mx-4 text-dark border-bottom">
        <h2>{t("hotel.attractions.attractions")}</h2>
      </div>

      <div className="table-responsive mx-4">
        <table className="table text-center table-striped table-hover">
          <thead>
            <tr>
              <th>{t("hotel.attractions.name")}</th>
              <th>{t("hotel.attractions.image")}</th>
              <th>{t("hotel.attractions.quantity")}</th>
              <th>{t("hotel.attractions.price")}</th>
              <th>{t("hotel.attractions.priceType.text")}</th>
            </tr>
          </thead>
          <tbody>
            {attractions[0] == 0 ? (
              <tr>
                <th colSpan="5">{t("hotel.attractions.noAttractions")}</th>
              </tr>
            ) : (
              attractions.map((attraction, index) => (
                <AttractionsRow key={index} attraction={attraction} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-5 pb-2 mx-4 text-dark border-bottom">
        <h2>{t("hotel.comments.comments")}</h2>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#commentModal">
          {t("hotel.comments.add")}
        </button>
      </div>

      <div className="modal fade" id="commentModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {t("hotel.comments.add")}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  value={commentAuthor}
                  className="form-control"
                  id="comment-author"
                  onChange={(e) => setCommentAuthor(e.target.value)}
                />
                <label htmlFor="comment-author">{t("hotel.comments.author")}</label>
              </div>

              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  value={commentComment}
                  id="comment-comment"
                  style={{ height: "100px" }}
                  onChange={(e) => setCommentComment(e.target.value)}></textarea>
                <label htmlFor="comment-comment">{t("hotel.comments.comment")}</label>
              </div>

              <div className="form-floating mb-3 fs-3 text-center">
                <StarRating getStars={handleGetStars} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                {t("hotel.comments.cancel")}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={(e) => handleAddComment(props.hotelId)}>
                {t("hotel.comments.add")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        {comments.length > 0 ? (
          <div className="container px-4 my-5">
            {comments.map((comment) => (
              <div className="card mb-3" key={comment.id}>
                <div className="card-body row">
                  <div className="col-md-10">
                    <p className="card-text">{comment.comment}</p>
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {comment.created_at}, @{comment.author}
                      </small>
                    </p>
                  </div>
                  <div className="col-md-2 text-center fs-5">
                    <p className="card-text">
                      <small className="text-body-secondary">
                        {<CalculateStars stars={comment.stars} />}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="container px-3">
            <small>{t("hotel.comments.empty")}</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default OneHotel;
