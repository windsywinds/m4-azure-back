const program = require('commander');
const { prompt } = require('inquirer')
const { seedCars, addCar, removeCar, listAllCars, findCarByAny, wipeDatabase } = require('./clifunctions.cjs')

program
    .version('1.0.0')
    .description('Client Management System')

const addCarQuestions = [
    {
        type: 'input',
        name: 'imgUrl',
        message: 'Enter url to car image'
    },
    {
        type: 'input',
        name: 'carType',
        message: 'Enter car body type'
    },
    {
        type: 'input',
        name: 'carColor',
        message: 'Enter car color'
    },
    {
        type: 'input',
        name: 'carBrand',
        message: 'Enter car brand name'
    },        
    {
        type: 'input',
        name: 'carPrice',
        message: 'Enter car price'
    }
]

const addSeedQuestions = [
    {
        type: 'input',
        name: 'filePath',
        message: 'Enter path to car seed data'
    }
]
const wipeConfirm = [
    {
        type: 'input',
        name: 'confirm',
        message: 'Are you sure you want to wipe all entries? Y/N'
    }
]

program
    .command('help')
    .alias('h')
    .description('List of commands the user can run')
    .action(() => {
        console.info('Welcome to the Database CLI')
        console.info('All commands must be stated after the command file path')
        console.info('Example: node server/cli/commands.cjs seedPath or npm run cli seedPath')
        console.info('The following is a list of commands available with descriptions:')
        console.info('seedPath - You will be prompted for a file path to load into the database')
        console.info('seed <filepath> - enter the file path from your root directory to load the database')
        console.info('add - you will be prompted for the details of a car to add to the database')
        console.info('remove <_Id> - enter the entry id of a car you wish to remove from the database')
        console.info('list - list all vehicles in the database')
        console.info('find <keyword> - provide a single keyword to search the database for matches, e.g. green, toyota, sedan')
        console.info('wipe - Delete all entries in the database. You will be asked to confirm Y/N')
    });

program
    .command('seedPath')
    .alias('p')
    .description('Add collection of cars from a json file')
    .action(() => {
        prompt(addSeedQuestions).then(answer => seedCars(answer.filePath))
    });
program
    .command('seed <filePath>')
    .alias('s')
    .description('Automatically add cars from a json file')
    .action(answer => seedCars(answer)
    );

program
    .command('add')
    .alias('a')
    .description('Add a single car')
    .action(() => {
        prompt(addCarQuestions).then(answers => addCar(answers))
    });

program
    .command('remove <_id>')
    .alias('r')
    .description('Remove a car from the database')
    .action(_id => removeCar(_id));

program
    .command('list')
    .alias('l')
    .description('List all cars in the database')
    .action(() => listAllCars())

program 
    .command('find <keyword>')
    .alias('f')
    .description('Find a car by keyword')
    .action(keyword => findCarByAny(keyword));

program
    .command('wipe')
    .alias('w')
    .description('Wipe all entires from database collection')
    .action(() => {
        prompt(wipeConfirm).then(answer => wipeDatabase(answer))
    });

program.parse(process.argv);