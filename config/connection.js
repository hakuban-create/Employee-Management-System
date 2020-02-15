const mysql=require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "testtest",
    database: "employee_db"
  });
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected to the DB");
  });

  module.exports=connection;