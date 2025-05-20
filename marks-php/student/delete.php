<?php
include '../db.php';

if (isset($_GET['id'])) {
    $id = intval($_GET['id']);
    $conn->query("DELETE FROM Students WHERE id=$id");
    // MSE and ESE rows will be deleted by cascade
}

header("Location: read.php");
exit;
