import { MdStar, MdStarOutline } from "react-icons/md";

const calculateStars = (props) => {
    let starshtml = [];
    let id = 0;

    for (let i = 0; i < props.stars; i++) {
      starshtml.push(<MdStar key={id}/>);
      id++;
    }
  
    for (let i = 0; i < 5 - props.stars; i++) {
      starshtml.push(<MdStarOutline key={id}/>);
      id++;
    }

    return starshtml;
}

export default calculateStars;