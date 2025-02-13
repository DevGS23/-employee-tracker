# Employee Tracker

A command-line Content Management System (CMS) for managing a company's employee database. Built using Node.js, Inquirer, and PostgreSQL.

## Features

- View all departments, roles, and employees
- Add departments, roles, and employees
- Update employee roles
- Database schema with three tables: departments, roles, and employees

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a PostgreSQL database and update the connection details in .env file
4. Set up the database schema:
   ```bash
   psql -U your_username -d your_database -f db/schema.sql
   ```
5. (Optional) Seed the database with sample data:
   ```bash
   psql -U your_username -d your_database -f db/seeds.sql
   ```

## Usage

Run the application:
```bash
npm start
```

Follow the prompts to:
- View all departments
- View all roles
- View all employees
- Add a department
- Add a role
- Add an employee
- Update an employee role

## Database Schema

### Department
- id: SERIAL PRIMARY KEY
- name: VARCHAR(30)

### Role
- id: SERIAL PRIMARY KEY
- title: VARCHAR(30)
- salary: DECIMAL
- department_id: INTEGER

### Employee
- id: SERIAL PRIMARY KEY
- first_name: VARCHAR(30)
- last_name: VARCHAR(30)
- role_id: INTEGER
- manager_id: INTEGER

## Video Walkthrough

[Link to video demonstration]