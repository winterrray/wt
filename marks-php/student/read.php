<?php
include '../db.php';

// Function to compute final marks for a student
function compute_final_marks($conn, $student_id) {
    // Fetch MSE marks
    $mse_res = $conn->query("SELECT * FROM MSE WHERE student_id=$student_id");
    $mse = $mse_res->fetch_assoc();

    // Fetch ESE marks
    $ese_res = $conn->query("SELECT * FROM ESE WHERE student_id=$student_id");
    $ese = $ese_res->fetch_assoc();

    $final_total = 0;
    if ($mse && $ese) {
        for ($i = 1; $i <= 4; $i++) {
            $mse_mark = $mse["subject$i"] ?? 0;
            $ese_mark = $ese["subject$i"] ?? 0;
            $final_total += ($mse_mark * 0.3) + ($ese_mark * 0.7);
        }
    }
    return round($final_total, 2);
}

$result = $conn->query("SELECT * FROM Students ORDER BY id DESC");
?>

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Roll Number</th>
            <th>Name</th>
            <th>Final Marks (4 Subjects)</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <?php if ($result->num_rows > 0):
            while ($row = $result->fetch_assoc()):
                $final = compute_final_marks($conn, $row['id']);
        ?>
        <tr>
            <td><?php echo htmlspecialchars($row['rollno']); ?></td>
            <td><?php echo htmlspecialchars($row['name']); ?></td>
            <td><?php echo $final; ?></td>
            <td>
                <a href="update.php?id=<?php echo $row['id']; ?>" class="btn btn-sm btn-warning">Edit</a>
                <a href="delete.php?id=<?php echo $row['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Are you sure?')">Delete</a>
            </td>
        </tr>
        <?php endwhile; else: ?>
        <tr><td colspan="4" class="text-center">No students found</td></tr>
        <?php endif; ?>
    </tbody>
</table>
