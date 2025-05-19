## db
CREATE DATABASE electricity_billing_node;
USE electricity_billing_node;

CREATE TABLE consumer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    address VARCHAR(255)
);

CREATE TABLE billing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    consumer_id INT,
    units INT,
    amount DECIMAL(10,2),
    billing_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (consumer_id) REFERENCES consumer(id)
);


## backend - node
npm init -y
npm install mysql

edit server.js code

node server.js

## frontend
npx create-react-app frontend
cd frontend
npm install axios bootstrap

in public/index.html (add Bootstrap):
<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
/>

edit src/App.js

npm start

## postman
GET http://localhost:3001/consumers

POST http://localhost:3001/consumer with { "name": "Raj", "address": "Pune" }

PUT http://localhost:3001/consumer/1 with { "name": "Updated Name", "address": "Updated Address" }

POST http://localhost:3001/billing with { "consumer_id": 1, "units": 180 }

DELETE http://localhost:3001/consumer/1

GET http://localhost:3001/bills/1
