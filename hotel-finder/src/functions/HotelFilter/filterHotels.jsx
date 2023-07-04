const filterHotels = (hotels, selectedCity, reviewScore, stars, wifi, parking, pets, roomService, breakfast, available, priceMin, priceMax, guests) => {
    return hotels.filter((hotel) => {
        if (selectedCity.length !== 0 && hotel.location.city.toLocaleLowerCase() !== selectedCity[0].toLocaleLowerCase()) {
            return false;
        }
    
        if (reviewScore && hotel.reviewsScore < reviewScore) {
                return false;
        }
        
        if (stars && hotel.stars != stars) {
                return false;
        }
        
        if (wifi && hotel.metadata.wifi !== wifi) {
            return false;
        }
    
        if (parking && hotel.metadata.parking !== parking) {
            return false;
        }
    
        if (pets && hotel.metadata.pets !== pets) {
            return false;
        }
    
        if (roomService && hotel.metadata.roomService !== roomService) {
            return false;
        }
    
        if (breakfast && (hotel.rooms.some((room) => room.breakfast === true) !== breakfast)) {
                return false;
        }
        
        if (available && (hotel.rooms.some((room) => room.available === true) !== available)) {
                return false;
        }
        
        if (priceMin && (hotel.rooms.some((room) => room.price < parseInt(priceMin)))) {
                return false;
        }
        
        if (priceMax && (hotel.rooms.some((room) => room.price > parseInt(priceMax)))) {
                return false;
        }
        
        if (guests && (hotel.rooms.some((room) => room.maxGuests >= parseInt(guests)) === false)) {
                return false;
        }
        
        return true;
    })
}

export default filterHotels;