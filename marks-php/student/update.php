<?php
include '../db.php';

$id = intval($_GET['id'] ?? 0);

// Fetch student
$student_res = $conn->query("SELECT * FROM Students WHERE id=$id");
if ($student_res->num_rows == 0) {
    die("Student not found");
}
$student = $student_res->fetch_assoc();

// Fetch MSE marks
$mse_res = $conn->query("SELECT * FROM MSE WHERE student_id=$id");
$mse = $mse_res->num_rows ? $mse_res->fetch_assoc() : null;

// Fetch ESE marks
$ese_res = $conn->query("SELECT * FROM ESE WHERE student_id=$id");
$ese = $ese_res->num_rows ? $ese_res->fetch_assoc() : null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $rollno = $_POST['rollno'];
    $name = $_POST['name'];

    // Update student info
    $stmt = $conn->prepare("UPDATE Students SET rollno=?, name=? WHERE id=?");
    $stmt->bind_param("ssi", $rollno, $name, $id);
    $stmt->execute();

    // MSE marks
    $mse_sub1 = intval($_POST['mse_sub1']);
    $mse_sub2 = intval($_POST['mse_sub2']);
    $mse_sub3 = intval($_POST['mse_sub3']);
    $mse_sub4 = intval($_POST['mse_sub4']);

    if ($mse) {
        $stmt = $conn->prepare("UPDATE MSE SET subject1=?, subject2=?, subject3=?, subject4=? WHERE student_id=?");
        $stmt->bind_param("iiiii", $mse_sub1, $mse_sub2, $mse_sub3, $mse_sub4, $id);
        $stmt->execute();
    } else {
        $stmt = $conn->prepare("INSERT INTO MSE (student_id, subject1, subject2, subject3, subject4) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iiiii", $id, $mse_sub1, $mse_sub2, $mse_sub3, $mse_sub4);
        $stmt->execute();
    }

    // ESE marks
    $ese_sub1 = intval($_POST['ese_sub1']);
    $ese_sub2 = intval($_POST['ese_sub2']);
    $ese_sub3 = intval($_POST['ese_sub3']);
    $ese_sub4 = intval($_POST['ese_sub4']);

    if ($ese) {
        $stmt = $conn->prepare("UPDATE ESE SET subject1=?, subject2=?, subject3=?, subject4=? WHERE student_id=?");
        $stmt->bind_param("iiiii", $ese_sub1, $ese_sub2, $ese_sub3, $ese_sub4, $id);
        $stmt->execute();
    } else {
        $stmt = $conn->prepare("INSERT INTO ESE (student_id, subject1, subject2, subject3, subject4) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("iiiii", $id, $ese_sub1, $ese_sub2, $ese_sub3, $ese_sub4);
        $stmt->execute();
    }

    header("Location: read.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Edit Student & Marks</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body class="container py-4">

    <h1>Edit Student & Marks</h1>
    <form method="post" action="">
        <div class="mb-3">
            <label>Roll Number</label>
            <input type="text" name="rollno" value="<?php echo htmlspecialchars($student['rollno']); ?>" class="form-control" required />
        </div>
        <div class="mb-3">
            <label>Name</label>
            <input type="text" name="name" value="<?php echo htmlspecialchars($student['name']); ?>" class="form-control" required />
        </div>

        <h3>MSE Marks (Out of 30)</h3>
        <?php
        for ($i = 1; $i <= 4; $i++) {
            $val = $mse ? $mse["subject$i"] : '';
            echo "<div class='mb-3'>
                    <label>Subject $i</label>
                    <input type='number' name='mse_sub$i' max='30' min='0' value='$val' class='form-control' />
                </div>";
        }
        ?>

        <h3>ESE Marks (Out of 70)</h3>
        <?php
        for ($i = 1; $i <= 4; $i++) {
            $val = $ese ? $ese["subject$i"] : '';
            echo "<div class='mb-3'>
                    <label>Subject $i</label>
                    <input type='number' name='ese_sub$i' max='70' min='0' value='$val' class='form-control' />
                </div>";
        }
        ?>

        <button class="btn btn-primary">Save</button>
        <a href="read.php" class="btn btn-secondary">Cancel</a>
    </form>

</body>
</html>
