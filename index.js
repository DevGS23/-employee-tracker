const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('./lib/queries');

async function mainMenu() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]);

    switch (choice) {
        case 'View all departments':
            const departments = await db.viewAllDepartments();
            console.table(departments);
            break;

        case 'View all roles':
            const roles = await db.viewAllRoles();
            console.table(roles);
            break;

        case 'View all employees':
            const employees = await db.viewAllEmployees();
            console.table(employees);
            break;

        case 'Add a department':
            const { departmentName } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'departmentName',
                    message: 'What is the name of the department?',
                    validate: input => input ? true : 'Department name cannot be empty'
                }
            ]);
            await db.addDepartment(departmentName);
            console.log(`Added ${departmentName} to departments`);
            break;

        case 'Add a role':
            const departments = await db.viewAllDepartments();
            const { title, salary, departmentId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'title',
                    message: 'What is the title of the role?',
                    validate: input => input ? true : 'Role title cannot be empty'
                },
                {
                    type: 'number',
                    name: 'salary',
                    message: 'What is the salary for this role?',
                    validate: input => !isNaN(input) ? true : 'Please enter a valid number'
                },
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Which department does this role belong to?',
                    choices: departments.map(dept => ({
                        name: dept.name,
                        value: dept.id
                    }))
                }
            ]);
            await db.addRole(title, salary, departmentId);
            console.log(`Added ${title} role`);
            break;

        case 'Add an employee':
            const roles = await db.viewAllRoles();
            const managers = await db.viewAllEmployees();
            const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "What is the employee's first name?",
                    validate: input => input ? true : 'First name cannot be empty'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "What is the employee's last name?",
                    validate: input => input ? true : 'Last name cannot be empty'
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: "What is the employee's role?",
                    choices: roles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: "Who is the employee's manager?",
                    choices: [
                        { name: 'None', value: null },
                        ...managers.map(emp => ({
                            name: `${emp.first_name} ${emp.last_name}`,
                            value: emp.id
                        }))
                    ]
                }
            ]);
            await db.addEmployee(firstName, lastName, roleId, managerId);
            console.log(`Added ${firstName} ${lastName} to employees`);
            break;

        case 'Update an employee role':
            const employees = await db.viewAllEmployees();
            const allRoles = await db.viewAllRoles();
            const { employeeId, newRoleId } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Which employee do you want to update?',
                    choices: employees.map(emp => ({
                        name: `${emp.first_name} ${emp.last_name}`,
                        value: emp.id
                    }))
                },
                {
                    type: 'list',
                    name: 'newRoleId',
                    message: 'What is their new role?',
                    choices: allRoles.map(role => ({
                        name: role.title,
                        value: role.id
                    }))
                }
            ]);
            await db.updateEmployeeRole(employeeId, newRoleId);
            console.log(`Updated employee's role`);
            break;

        case 'Exit':
            console.log('Goodbye!');
            process.exit();
    }

    // Return to main menu
    if (choice !== 'Exit') {
        console.log('\n');
        await mainMenu();
    }
}

// Start the application
console.log('Welcome to the Employee Management System');
mainMenu().catch(console.error);