const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());

// ✅ MySQL connection using environment variables
const connection = mysql.createConnection({
  host: process.env.DB_HOST,       // should be mysql-service
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "dishes_db",
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

// Root route
app.get("/", (req, res) => {
  res.send("West African Dishes API is running");
});

// ✅ REAL DATA FROM DATABASE
app.get("/dishes", (req, res) => {
  connection.query("SELECT * FROM dishes", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    res.json(results);
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
