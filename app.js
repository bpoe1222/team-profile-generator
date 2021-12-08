const createHTML = require('./src/createHTML');


const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


const fs = require('fs');
const inquirer = require('inquirer');


const arrayOfTeams = [];


const managerAdder = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'Enter name of manager:'
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter manager's ID:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter manager's email:"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter manager's office number:"
        }
    ])
        .then(managerAddition => {
            const { name, id, email, officeNumber } = managerAddition;
            const manager = new Manager(name, id, email, officeNumber);

            arrayOfTeams.push(manager);
            console.log(manager);
        })
};

const employeeAdder = () => {
    console.log(`
    Adding new employees to team
    `);

    return inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Choose employee's role:",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "Enter employee's name:"
        },
        {
            type: 'input',
            name: 'id',
            message: "Enter the employee's ID:"
        },
        {
            type: 'input',
            name: 'email',
            message: "Enter employee's email:"
        },
        {
            type: 'input',
            name: 'github',
            message: "Enter employee's github username:",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's github username!")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter intern's school:",
            when: (input) => input.role === "Intern"
        },
        {
            type: 'confirm',
            name: 'confirmemployeeAdder',
            message: 'Want to add more team members?',
            default: false
        }
    ])
        .then(addEmployeeData => {
            

            let { name, id, email, role, github, school, confirmemployeeAdder } = addEmployeeData;
            let employee;

            if (role === "Engineer") {
                employee = new Engineer(name, id, email, github);

                console.log(employee);

            } else if (role === "Intern") {
                employee = new Intern(name, id, email, school);

                console.log(employee);
            }

            arrayOfTeams.push(employee);

            if (confirmemployeeAdder) {
                return employeeAdder(arrayOfTeams);
            } else {
                return arrayOfTeams;
            }
        })

};



const writeFile = data => {
    fs.writeFile('./src/index.html', data, err => {
        
        if (err) {
            console.log(err);
            return;
            
        } else {
            console.log("Your team profile has been successfully created! Please check out the index.html")
        }
    })
};

managerAdder()
    .then(employeeAdder)
    .then(arrayOfTeams => {
        return createHTML(arrayOfTeams);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .catch(err => {
        console.log(err);
    });