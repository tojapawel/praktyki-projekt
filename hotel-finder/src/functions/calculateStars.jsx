const calculateStars = (props) => {
    let starshtml = [];
    let id = 0;

    for (let i = 0; i < props.stars; i++) {
      starshtml.push(<i className='bi bi-star-fill' key={id}/>);
      id++;
    }
  
    for (let i = 0; i < 5 - props.stars; i++) {
      starshtml.push(<i className='bi bi-star' key={id}/>);
      id++;
    }

    return starshtml;
}

export default calculateStars;