<?php
require 'connection.php';

function getAllTahun()
{
  global $conn;
  $result = $conn->query("SELECT * FROM tahun ORDER BY nama_tahun DESC");
  $tahun = array();

  while ($row = $result->fetch_assoc()) {
    $tahun[] = $row;
  }

  return $tahun;
}

function getTahun($id)
{
  global $conn;
  $result = $conn->query("SELECT * FROM tahun WHERE id_tahun = $id");

  if ($result->num_rows > 0) {
    return $result->fetch_assoc();
  } else {
    return null;
  }
}

function saveTahun($name, $status, $id = null)
{
  global $conn;

  if ($id) {
    $stmt = $conn->prepare("UPDATE tahun SET nama_tahun=?, status=? WHERE id_tahun=?");
    $stmt->bind_param("ssi", $name, $status, $id);
  } else {
    $stmt = $conn->prepare("INSERT INTO tahun (nama_tahun, status) VALUES (?, ?)");
    $stmt->bind_param("ss", $name, $status);
  }

  $stmt->execute();
  $stmt->close();
}

function deleteTahun($id)
{
  global $conn;
  $conn->query("DELETE FROM tahun WHERE id_tahun = $id");
}

if (isset($_GET["action"])) {
  $action = $_GET["action"];

  switch ($action) {
    case "getAllTahun":
      $tahun = getAlltahun();
      header('Content-Type: application/json');
      echo json_encode($tahun);
      break;

    case "getTahun":
      if (isset($_GET["id"])) {
        $id = $_GET["id"];
        $tahun = getTahun($id);
        header('Content-Type: application/json');
        echo json_encode($tahun);
      }
      break;

    case "saveTahun":
      if ($_SERVER["REQUEST_METHOD"] === "POST") {
        $name = $_POST["year"];
        $status = $_POST["status"];
        $id = isset($_POST["tahunId"]) ? $_POST["tahunId"] : null;
        saveTahun($name, $status, $id);
        header('Content-Type: application/json');
        echo json_encode(["status" => "success"]);
      }
      break;

    case "deleteTahun":
      if (isset($_GET["id"])) {
        $id = $_GET["id"];
        deleteTahun($id);
        header('Content-Type: application/json');
        echo json_encode(["status" => "success"]);
      }
      break;
  }
}

$conn->close();
