const filterHotels = (hotels, rooms, selectedCity, reviewScore, stars, wifi, parking, pets, roomService, breakfast, available, priceMin, priceMax, guests) => {
    return hotels.filter((hotel) => {
        const wifiBinary = wifi ? 1 : 0;
        const parkingBinary = parking ? 1 : 0;
        const petsBinary = pets ? 1 : 0;
        const roomServiceBinary = roomService ? 1 : 0;

        const newRooms = rooms.filter(room => room.hotel_id === hotel.id);

        if (selectedCity.length !== 0 && hotel.city.toLowerCase() !== selectedCity[0].toLowerCase()) {
            return false;
        }

        if (reviewScore && hotel.reviewScore < reviewScore) {
            return false;
        }

        if (stars && hotel.stars !== stars) {
            return false;
        }

        if (wifi && hotel.wifi !== wifiBinary) {
            return false;
        }

        if (parking && hotel.parking !== parkingBinary) {
            return false;
        }

        if (pets && hotel.pets !== petsBinary) {
            return false;
        }

        if (roomService && hotel.roomService !== roomServiceBinary) {
            return false;
        }
        
        if (breakfast && !newRooms.some(room => room.breakfast === 1)) {
            return false;
        }

        if (available && !newRooms.some(room => room.available === 1)) {
            return false;
        }

        if (priceMin === undefined) {
            priceMin = 0;
        }

        if (priceMax === undefined) {
            priceMax = 100000000;
        }

        if (priceMin !== undefined && priceMax !== undefined && !newRooms.some(room => room.price >= priceMin && room.price <= priceMax)) {
            return false;
        }

        if (guests && !newRooms.some(room => room.maxGuests >= parseInt(guests))) {
            return false;
        }

        return true;
    });
};

export default filterHotels;
