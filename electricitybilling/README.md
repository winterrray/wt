## db
CREATE DATABASE electricity_billing;

USE electricity_billing;

CREATE TABLE consumer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE billing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consumer_id INT,
    units_consumed INT,
    bill_amount DOUBLE,
    billing_date DATE,
    FOREIGN KEY (consumer_id) REFERENCES consumer(id)
);


## backend
while initializing using spring.io, Dependencies:
- Spring Web
- Spring Data JPA
- MySQL Driver
- Lombok

folder structure
backend/
├── controller/
├── model/
├── repository/
├── service/
└── application.properties

whatever new files, create and add code
update application.properties & pom.xml
put pswd for root


## frontend
npx create-react-app electricity-bill-frontend
cd electricity-bill-frontend
npm install axios bootstrap

Add following line to src/index.js (alr included in file)
import 'bootstrap/dist/css/bootstrap.min.css';

update app.js

## postman
1. Add Consumer (POST)
URL: http://localhost:8080/api/consumers
body->json
{
  "name": "Raj",
  "address": "Pune"
}

2. Get All Consumers (GET)
URL: http://localhost:8080/api/consumers

3. Get Single Consumer (GET)
URL: http://localhost:8080/api/consumers/1

4. Update Consumer (PUT)
URL: http://localhost:8080/api/consumers/1
body->json
{
  "name": "Raj Kumar",
  "address": "Delhi"
}

5. Delete Consumer (DELETE)
URL: http://localhost:8080/api/consumers/1

6. Generate Bill (POST)
URL: http://localhost:8080/api/billing/generate?consumerId=1&units=120