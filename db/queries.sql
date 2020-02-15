--select all employees
SELECT e.id, e.first_name, e.last_name, r.title, d.name,  r.salary,
 (SELECT CONCAT(first_name,' ', last_name) FROM employee WHERE id=e.manager_id) AS manager 
 FROM employee e JOIN role r ON e.role_id=r.id JOIN department d ON r.department_id=d.id;

 DELETE from employee WHERE first_name='Tom' and last_name='Allen';

  INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (8, "Tammer", "Galal", 04, 5);

  UPDATE employee SET manager_id=2 where first_name='Sarah' and last_name='Lourd';