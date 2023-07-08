<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $database = "hotels";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "DELETE FROM rooms";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $sql = "ALTER TABLE rooms AUTO_INCREMENT = 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $sql = "DELETE FROM hotels";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $sql = "ALTER TABLE hotels AUTO_INCREMENT = 1";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        echo "Removed";
    } else {
        echo "Error removing data: " . $stmt->error;
    }

    $conn->close();

    header('Location: index.html');

?>