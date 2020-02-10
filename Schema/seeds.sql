
INSERT INTO department (id, name) VALUES (100,"Sales");
INSERT INTO department (id, name) VALUES (101, "Engineering");
INSERT INTO department (id, name) VALUES (102, "Finance");
INSERT INTO department (id, name) VALUES (103, "Legal");

INSERT INTO role (id, title, salary, department_id) VALUES (01,"Sales Lead", 100000,100);
INSERT INTO role (id, title, salary, department_id) VALUES (02, "Salesperson", 80000, 100);
INSERT INTO role (id, title, salary, department_id) VALUES (03, "Lead Engineer", 150000, 101);
INSERT INTO role (id, title, salary, department_id) VALUES (04, "Software Engineer", 120000, 101);
INSERT INTO role (id, title, salary, department_id) VALUES (05, "Accountant", 125000, 102);
INSERT INTO role (id, title, salary, department_id) VALUES (06, "Legal Team Lead", 250000, 103);
INSERT INTO role (id, title, salary, department_id) VALUES (07, "Lawyer", 190000, 103); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "John", "Doe", 01, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, "Mike", "Chan", 02, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, "Ashley", "Rodriguez", 03, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, "Kevin", "Tupik", 04, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, "Malia", "Brown", 05, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, "Sarah", "Lourd", 06, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7, "Tom", "Allen", 07, 6);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, "Tammer", "Galal", 04, 5);