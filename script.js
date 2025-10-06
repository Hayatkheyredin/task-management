const mysql = require("mysql");
const express = require("express");

const app = express();

app.listen(3001, () => {
  console.log("Listening to port 3001.");
});

const mysqlConnection = mysql.createConnection({
  user: "hayat",
  password: "allah",
  host: "127.0.0.1",
  database: "users"
});

mysqlConnection.connect((err) => {
  if (err) {
    console.log("❌ Database connection error:", err);
  } else {
    console.log("✅ Connected to MySQL database.");
  }
});

// Route to create table
app.get("/install", (req, res) => {
  const message = "Table created (if it didn't exist already).";
  
  const CreateProduct = `
    CREATE TABLE IF NOT EXISTS Products (
      product_id INT AUTO_INCREMENT,
      product_url VARCHAR(255) NOT NULL,
      product_name VARCHAR(255) NOT NULL,
      PRIMARY KEY (product_id)
    )
  `;

  mysqlConnection.query(CreateProduct, (err, results, fields) => {
    if (err) {
      console.log("❌ Error creating table:", err);
      res.status(500).send("Error creating table");
    } else {
      console.log("✅ Table created or already exists.");
      res.send(message);
    }
  });
});
