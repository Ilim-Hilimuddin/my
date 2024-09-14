<?php
try {
  $conn = mysqli_connect("localhost", "root", "", "prakarya");

  if (!$conn) {
    throw new Exception("Failed to connect to the database: " . mysqli_connect_error());
  }
} catch (Exception $e) {
  header("Location: error-500.html");
  exit;
}
