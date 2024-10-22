const fs = require('fs');
const inquirer = require('inquirer');
const path = require('path');

const templatesDir = path.join(__dirname, '../templates');

// Function to generate website
const generateWebsite = (template, title, description) => {
    const templatePath = path.join(templatesDir, `${template}.html`);
    let content = fs.readFileSync(templatePath, 'utf-8');

    // Replace placeholders
    content = content.replace('{{title}}', title);
    content = content.replace('{{description}}', description);

    const outputPath = path.join(__dirname, `../output/${template}-website.html`);
    fs.writeFileSync(outputPath, content, 'utf-8');
    console.log(`Website generated at: ${outputPath}`);
};

// User prompt
inquirer.prompt([
    {
        type: 'list',
        name: 'template',
        message: 'Choose a website template:',
        choices: ['blog', 'portfolio', 'store']
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter the website title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a short description:'
    }
]).then(answers => {
    generateWebsite(answers.template, answers.title, answers.description);
});
