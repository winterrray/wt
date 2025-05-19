const http = require('http');
const mysql = require('mysql');
const url = require('url');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vit@123$', // Your MySQL password
    database: 'electricity_billing_node'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

function calculateBill(units) {
    let amount = 0;
    if (units <= 50) amount = units * 3.5;
    else if (units <= 150) amount = (50 * 3.5) + (units - 50) * 4;
    else if (units <= 250) amount = (50 * 3.5) + (100 * 4) + (units - 150) * 5.2;
    else amount = (50 * 3.5) + (100 * 4) + (100 * 5.2) + (units - 250) * 6.5;
    return amount.toFixed(2);
}

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsed = url.parse(req.url, true);
    const { pathname, query } = parsed;

    if (req.method === 'GET' && pathname === '/consumers') {
        db.query("SELECT * FROM consumer", (err, results) => {
            if (err) {
                res.writeHead(500);
                return res.end("Database error");
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });

    } else if (req.method === 'POST' && pathname === '/consumer') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { name, address } = data;
                db.query("INSERT INTO consumer (name, address) VALUES (?, ?)", [name, address], (err, result) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end("Insert error");
                    }
                    res.writeHead(201);
                    res.end("Consumer added");
                });
            } catch {
                res.writeHead(400);
                res.end("Invalid JSON");
            }
        });

    } else if (req.method === 'PUT' && pathname.startsWith('/consumer/')) {
        const id = pathname.split('/')[2];
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { name, address } = data;
                db.query("UPDATE consumer SET name = ?, address = ? WHERE id = ?", [name, address, id], (err) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end("Update error");
                    }
                    res.writeHead(200);
                    res.end("Consumer updated");
                });
            } catch {
                res.writeHead(400);
                res.end("Invalid JSON");
            }
        });

    } else if (req.method === 'DELETE' && pathname.startsWith('/consumer/')) {
        const id = pathname.split('/')[2];
        db.query("DELETE FROM consumer WHERE id = ?", [id], (err) => {
            if (err) {
                res.writeHead(500);
                return res.end("Delete error");
            }
            res.writeHead(200);
            res.end("Consumer deleted");
        });

    } else if (req.method === 'POST' && pathname === '/billing') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { consumer_id, units } = data;
                const amount = calculateBill(units);
                db.query("INSERT INTO billing (consumer_id, units, amount) VALUES (?, ?, ?)", [consumer_id, units, amount], (err) => {
                    if (err) {
                        res.writeHead(500);
                        return res.end("Billing insert error");
                    }
                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: "Bill generated", amount }));
                });
            } catch {
                res.writeHead(400);
                res.end("Invalid JSON");
            }
        });

    } else if (req.method === 'GET' && pathname.startsWith('/bills/')) {
        const consumerId = pathname.split('/')[2];
        db.query("SELECT * FROM billing WHERE consumer_id = ?", [consumerId], (err, results) => {
            if (err) {
                res.writeHead(500);
                return res.end("Database error");
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(results));
        });

    } else {
        res.writeHead(404);
        res.end("Route not found");
    }
});

server.listen(3001, () => console.log('Server running on port 3001'));
