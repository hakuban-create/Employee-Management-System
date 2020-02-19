INSERT INTO department (id, department) VALUES (1,"Sales");
INSERT INTO department (id, department) VALUES (2, "Engineering");
INSERT INTO department (id, department) VALUES (3, "Finance");
INSERT INTO department (id, department) VALUES (4, "Legal");

INSERT INTO role (id, title, salary, department_id) VALUES (1,"Sales Lead", 100000,1);
INSERT INTO role (id, title, salary, department_id) VALUES (2, "Salesperson", 80000, 1);
INSERT INTO role (id, title, salary, department_id) VALUES (3, "Lead Engineer", 150000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (4, "Software Engineer", 120000, 2);
INSERT INTO role (id, title, salary, department_id) VALUES (5, "Accountant", 125000, 3);
INSERT INTO role (id, title, salary, department_id) VALUES (6, "Legal Team Lead", 250000, 4);
INSERT INTO role (id, title, salary, department_id) VALUES (7, "Lawyer", 190000, 4); 

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (1, "John", "Doe", 1, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (2, "Mike", "Chan", 2, 1);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (3, "Ashley", "Rodriguez", 3, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (4, "Kevin", "Tupik", 4, 3);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (5, "Malia", "Brown", 5, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (6, "Sarah", "Lourd", 6, null);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (7, "Tom", "Allen", 7, 6);
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, "Tammer", "Galal", 4, 5);