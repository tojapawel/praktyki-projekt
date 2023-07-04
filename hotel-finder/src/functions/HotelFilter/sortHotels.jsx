const sortHotels = (type, filtered) => {
    switch (type) {
        case "gm":
            return filtered.sort((a, b) => b.stars - a.stars);
        case "gr":
            return filtered.sort((a, b) => a.stars - b.stars);
        case "om":
            return filtered.sort((a, b) => b.reviewsScore - a.reviewsScore);
        case "or":
            return filtered.sort((a, b) => a.reviewsScore - b.reviewsScore);
        case "odcm":
            return filtered.sort((a, b) => b.metadata.distanceFromCenter - a.metadata.distanceFromCenter);
        case "odcr":
            return filtered.sort((a, b) => a.metadata.distanceFromCenter - b.metadata.distanceFromCenter);
        case "na":
            return filtered.sort((a, b) => a.name.localeCompare(b.name));
        case "ma":
            return filtered.sort((a, b) => a.location.city.localeCompare(b.location.city));
        default:
            break;
    }
}

export default sortHotels;