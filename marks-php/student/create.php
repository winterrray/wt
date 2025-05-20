<?php
include '../db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $rollno = $_POST['rollno'];
    $name = $_POST['name'];

    // Insert into Students
    $stmt = $conn->prepare("INSERT INTO Students (rollno, name) VALUES (?, ?)");
    $stmt->bind_param("ss", $rollno, $name);
    if ($stmt->execute()) {
        header("Location: read.php");
        exit;
    } else {
        $error = "Roll number must be unique.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Add Student</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="container py-4">

    <h1>Add New Student</h1>
    <?php if (isset($error)) echo "<div class='alert alert-danger'>$error</div>"; ?>
    <form method="post" action="">
        <div class="mb-3">
            <label>Roll Number</label>
            <input type="text" name="rollno" class="form-control" required />
        </div>
        <div class="mb-3">
            <label>Name</label>
            <input type="text" name="name" class="form-control" required />
        </div>
        <button class="btn btn-success">Add Student</button>
        <a href="read.php" class="btn btn-secondary">Back</a>
    </form>

</body>
</html>
