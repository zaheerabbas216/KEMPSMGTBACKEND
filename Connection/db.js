const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kempsdb",
});

db.connect((err) => {
  if (err) {
    console.log("error connecting to the kemps db");
  } else {
    console.log("connected to kemps db successfully");
  }
});

module.exports = db;
