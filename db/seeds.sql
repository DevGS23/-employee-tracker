-- Insert departments
INSERT INTO department (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

-- Insert roles
INSERT INTO role (title, salary, department_id) VALUES
    ('Software Engineer', 85000, 1),
    ('Lead Engineer', 125000, 1),
    ('Sales Representative', 65000, 2),
    ('Sales Manager', 100000, 2),
    ('Accountant', 75000, 3),
    ('Finance Manager', 115000, 3),
    ('Legal Counsel', 95000, 4),
    ('Legal Director', 135000, 4);

-- Insert employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 2, NULL),
    ('Jane', 'Smith', 1, 1),
    ('Mike', 'Johnson', 4, NULL),
    ('Sarah', 'Williams', 3, 3),
    ('Tom', 'Brown', 6, NULL),
    ('Lisa', 'Davis', 5, 5),
    ('David', 'Miller', 8, NULL),
    ('Emma', 'Wilson', 7, 7);