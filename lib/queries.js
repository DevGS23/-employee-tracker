const pool = require('./db');

class DB {
    // View all departments
    async viewAllDepartments() {
        const query = 'SELECT * FROM department ORDER BY id';
        const { rows } = await pool.query(query);
        return rows;
    }

    // View all roles
    async viewAllRoles() {
        const query = `
            SELECT r.id, r.title, r.salary, d.name as department
            FROM role r
            JOIN department d ON r.department_id = d.id
            ORDER BY r.id`;
        const { rows } = await pool.query(query);
        return rows;
    }

    // View all employees
    async viewAllEmployees() {
        const query = `
            SELECT 
                e.id,
                e.first_name,
                e.last_name,
                r.title,
                d.name AS department,
                r.salary,
                CONCAT(m.first_name, ' ', m.last_name) AS manager
            FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id
            ORDER BY e.id`;
        const { rows } = await pool.query(query);
        return rows;
    }

    // Add a department
    async addDepartment(name) {
        const query = 'INSERT INTO department (name) VALUES ($1) RETURNING *';
        const { rows } = await pool.query(query, [name]);
        return rows[0];
    }

    // Add a role
    async addRole(title, salary, departmentId) {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *';
        const { rows } = await pool.query(query, [title, salary, departmentId]);
        return rows[0];
    }

    // Add an employee
    async addEmployee(firstName, lastName, roleId, managerId) {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *';
        const { rows } = await pool.query(query, [firstName, lastName, roleId, managerId]);
        return rows[0];
    }

    // Update an employee role
    async updateEmployeeRole(employeeId, roleId) {
        const query = 'UPDATE employee SET role_id = $2 WHERE id = $1 RETURNING *';
        const { rows } = await pool.query(query, [employeeId, roleId]);
        return rows[0];
    }

    // Get all managers
    async getManagers() {
        const query = `
            SELECT DISTINCT m.id, m.first_name, m.last_name
            FROM employee e
            JOIN employee m ON e.manager_id = m.id`;
        const { rows } = await pool.query(query);
        return rows;
    }
}

module.exports = new DB();