var connection = require("./connection.js");


var orm = {
    select: function(columnName, tableName, cb) {
      var queryString = "SELECT "+columnName+" FROM " + tableName + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    selectWithCondition: function(columnName, tableName, condition, cb){
        var queryString="SELECT "+columnName+" FROM "+tableName+" WHERE "+condition+";";
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            cb(result);
        })
    },
    getAllEmployee: function(cb){
      connection.query("SELECT e.id, e.first_name, e.last_name, r.title, d.name,  r.salary,(SELECT CONCAT(first_name,' ', last_name) FROM employee WHERE id=e.manager_id) AS manager FROM employee e JOIN role r ON e.role_id=r.id JOIN department d ON r.department_id=d.id",function(err, data){
        if(err) throw err;
        cb(data);
    })
    },
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO " + table;
  
      queryString += " (";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
  
      console.log(queryString);
  
      connection.query(queryString, vals, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function(table, objColVals, condition, cb) {
      var queryString = "UPDATE " + table;
  
      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    }
  };

  

module.exports = orm;
