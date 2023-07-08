<?php
    $jsonFilePath = 'hotels.json';

    $jsonData = file_get_contents($jsonFilePath);

    $data = json_decode($jsonData, true);

    if ($data === null) {
        echo 'Error decoding JSON file.';
    }

    $conn = new mysqli("localhost", "root", "", "hotels");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    foreach ($data as $hotel) {
        $reviewScore = isset($hotel['reviewScore']) && is_numeric($hotel['reviewScore']) ? $hotel['reviewScore'] : 0;

        $sql = "INSERT INTO hotels (hotel_id, name, city, code, address, stars, wifi, parking, pets, roomService, reviewScore, promoted) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ssssssiiiiii", $hotel['id'], $hotel['name'], $hotel['location']['city'], $hotel['location']['postCode'], $hotel['location']['address'], $hotel['stars'], $hotel['metadata']['wifi'], $hotel['metadata']['parking'], $hotel['metadata']['pets'], $hotel['metadata']['roomService'], $reviewScore, $hotel['promoted']);
        $stmt->execute();

        if ($stmt->affected_rows > 0) {
            echo "Data inserted successfully!";
        } else {
            echo "Error inserting data: " . $stmt->error;
        }

        echo "<br/>";

        foreach ($hotel['rooms'] as $room) {
            $hotel_id = $hotel['id'];
            $price_value = $room['price'];
            $max_guests_value = $room['maxGuests'];
            $beds_value = $room['beds'];
            $family_room_value = $room['familyRoom'] ? 1 : 0;
            $area_value = $room['area'];
            $breakfast_value = $room['breakfast'] ? 1 : 0;
            $available_value = $room['available'] ? 1 : 0;
            
            $sql = "INSERT INTO rooms (hotel_id, price, maxGuests, beds, familyRoom, area, breakfast, available)
                    VALUES (
                        (SELECT id FROM hotels WHERE hotel_id = ?),
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?,
                        ?
                    )";
            
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("siiiiiii", $hotel_id, $price_value, $max_guests_value, $beds_value, $family_room_value, $area_value, $breakfast_value, $available_value);
            $stmt->execute();
        }
    }

    $conn->close();

    header('Location: index.html');
?>
