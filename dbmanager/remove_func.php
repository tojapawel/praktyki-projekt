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

    $sql = "DELETE FROM hotelss";
    $stmt = $conn->prepare($sql);
    if (!$stmt->execute()) {
        echo "Error removing data from hotelss: " . $stmt->error;
        exit();
    }

    $sql = "ALTER TABLE hotelss AUTO_INCREMENT = 1";
    $stmt = $conn->prepare($sql);
    if (!$stmt->execute()) {
        echo "Error resetting auto increment for hotelss: " . $stmt->error;
        exit();
    }

    $conn->close();

    header('Location: index.html?removeok=true');
    exit();
?>