<?php
header('Content-Type: text/html; charset=utf-8');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES["jsonFile"]) && $_FILES["jsonFile"]["error"] == UPLOAD_ERR_OK) {
        $tmpFile = $_FILES["jsonFile"]["tmp_name"];

        $jsonContent = file_get_contents($tmpFile);
        $data = json_decode($jsonContent, true);
    } else {
        echo "Error uploading file.";
    }
}

if ($data === null) {
    echo 'Error decoding JSON file.';
}

$servername = "192.168.0.137";
$username = "root";
$password = "root";
$database = "hotel-finder";
$port = 33075;

$conn = new mysqli($servername, $username, $password, $database, $port);
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

foreach ($data as $hotel) {
    $sql = "INSERT INTO hotels
        (hotel_id, name, city, code, address, stars, distanceFromCenter, wifi, parking, pets, roomService, reviewScore, promoted) 
        VALUES 
        (?,?,?,?,?,?,?,?,?,?,?,?,?)";

    $stmt = $conn->prepare($sql);
    if (!$stmt) {
        die("Error in preparing statement: " . $conn->error);
    }

    $hotelId = $hotel['id'];
    $name = $hotel['name'];
    $city = $hotel['location']['city'];
    $code = $hotel['location']['postCode'];
    $address = $hotel['location']['address'];
    $stars = $hotel['stars'];
    $distanceFromCenter = (float) $hotel['metadata']['distanceFromCenter'];
    $wifi = $hotel['metadata']['wifi'];
    if ($wifi) {
        $wifi = 1;
    } else {
        $wifi = 0;
    }

    $parking = $hotel['metadata']['parking'];
    if ($parking) {
        $parking = 1;
    } else {
        $parking = 0;
    }

    $pets = $hotel['metadata']['pets'];
    if ($pets) {
        $pets = 1;
    } else {
        $pets = 0;
    }

    $roomService = $hotel['metadata']['roomService'];
    if ($roomService) {
        $roomService = 1;
    } else {
        $roomService = 0;
    }

    $reviewScore = (float) $hotel['reviewsScore'];
    $promoted = $hotel['promoted'];
    if ($promoted) {
        $promoted = 1;
    } else {
        $promoted = 0;
    }

    if ($stmt->execute([$hotelId, $name, $city, $code, $address, $stars, $distanceFromCenter, $wifi, $parking, $pets, $roomService, $reviewScore, $promoted])) {
    }

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

header('Location: index.html?addok=true');
exit();
?>