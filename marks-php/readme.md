## db
CREATE DATABASE vit_results;
USE vit_results;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    roll_no VARCHAR(20) UNIQUE
);

CREATE TABLE mse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject1 INT,
    subject2 INT,
    subject3 INT,
    subject4 INT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE ese (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    subject1 INT,
    subject2 INT,
    subject3 INT,
    subject4 INT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);


## backend - frontend

marks-php/
│
├── index.php
├── add_student.php
├── edit_student.php
├── delete_student.php
├── result.php
└── db.php


## how to run
xampp -> start apache, mysql
mysql -u root -p OR mysql -u root
and execute db script
all files in elec-php
elec-php in htdocs of xampp of c drive
in browser, http://localhost/marks-php/index.html

