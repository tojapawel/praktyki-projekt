import React, { useState } from "react";
import { MdStarOutline, MdStar } from "react-icons/md";

import "./starRating.css";

const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (newRating) => {
    setRating(newRating);
    props.getStars(newRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoverRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverRating || rating) ? "active" : ""}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={handleStarLeave}>
            {star <= (hoverRating || rating) ? <MdStar /> : <MdStarOutline />}
          </span>
        ))}
      </div>
      {/* <div className="rating-text">Ocena: {rating}/5</div> */}
    </div>
  );
};

export default StarRating;
