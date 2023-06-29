export default function calculateStars(stars) {
    let starshtml = "";

    for (let i = 0; i < stars; i++) {
        starshtml += '★';
    }

    for (let i = 0; i < 5 - stars; i++) {
        starshtml += '☆';
    }

    return starshtml;
}