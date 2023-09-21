import { MdStar, MdStarOutline } from "react-icons/md";

const calculateStars = (props) => {
  const stars = Array.from({ length: 5 }, (_, i) =>
    i < props.stars ? <MdStar key={i} /> : <MdStarOutline key={i} />
  );

  return stars;
};

export default calculateStars;
