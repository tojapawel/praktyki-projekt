<?php
    $servername = "192.168.0.137";
    $username = "root";
    $password = "root";
    $database = "hotel-finder";
    $port = 33075;

    $conn = new mysqli($servername, $username, $password, $database, $port);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "DELETE FROM rooms";
    $stmt = $conn->prepare($sql);
    if (!$stmt->execute()) {
        echo "Error removing data from rooms: " . $stmt->error;
        exit();
    }

    $sql = "ALTER TABLE rooms AUTO_INCREMENT = 1";
    $stmt = $conn->prepare($sql);
    if (!$stmt->execute()) {
        echo "Error resetting auto increment for rooms: " . $stmt->error;
        exit();
    }

    $sql = "DELETE FROM hotels";
    $stmt = $conn->prepare($sql);
    if (!$stmt->execute()) {
        echo "Error removing data from hotels: " . $stmt->error;
        exit();
    }

    $sql = "ALTER TABLE hotels AUTO_INCREMENT = 1";
    $stmt = $conn->prepare($sql);
    if (!$stmt->execute()) {
        echo "Error resetting auto increment for hotels: " . $stmt->error;
        exit();
    }

    $conn->close();

    header('Location: index.html?removeok=true');
    exit();
?>