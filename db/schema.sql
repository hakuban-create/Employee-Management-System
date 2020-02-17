DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT,
  department VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT,
  title VARCHAR(30),
  salary decimal,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT null,
  PRIMARY KEY (id)
);
