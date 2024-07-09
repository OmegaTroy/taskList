import {createPromptModule} from 'inquirer';
import { program } from 'commander';
import {addTask, listTask,updateTask,removeTask} from './controllers/task.controller.js'
import chalk from 'chalk'

const prompt = createPromptModule()

program.version('0.0.1').description('A CLI tool for managing your todo.');

program.command('add').alias('a').action(async()=>{
   const answers = await prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is your task?'
        }
    ])
    await addTask(answers)
    console.log('\n' +chalk.magenta('') + chalk.hex('#000').bgMagenta.bold("    Todo List    ") + chalk.magenta('\n'));
    await listTask()
})

program.command('todo').alias('l').action(async()=>{
  console.log('\n' +chalk.magenta('') + chalk.hex('#000').bgMagenta.bold("    Todo List    ") + chalk.magenta('\n'));
   await listTask()
})

program.command('toggle <id>').alias('t').action(async(id)=>{
   const answers = await prompt([
        {
            type: 'input',
            name: 'name',
            message: 'what is your task?'
        },
        {
            type: 'confirm',
            name: 'completed',
            message: 'is it completed?'
        }
    ])
    await updateTask(id,answers)
    console.log('\n' +chalk.magenta('') + chalk.hex('#000').bgMagenta.bold("    Todo List    ") + chalk.magenta('\n'));

    await listTask()
})

program.command('remove <id>').alias('r').action(async(id)=>{
  await removeTask(id)
  console.log('\n' +chalk.magenta('') + chalk.hex('#000').bgMagenta.bold("    Todo List    ") + chalk.magenta('\n'));
  await listTask()
})

program.parse(process.argv);