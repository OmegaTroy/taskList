import readline from 'readline';
import chalk from 'chalk';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tasks = [
  {name: 'Learn JavaScript', complete: false},
  {name: 'Learn Node.js', complete: false},
  {name: 'Learn React', complete: false},
];

function askQuestion(query) {
  return new Promise(resolve => rl.question(query,resolve))
}


function listTasks(){
  tasks.forEach((task,index )=> console.log(` ${index + 1}. ${task.complete ? '✔ ' : '❌' }  ${task.name}`));
}

function handleAction(action){
  const [command, ...args] = action.split(' ');
  command.toLowerCase();
  // exit
  if(command === '-e') {
    rl.close();
    return false;
  }
  // add task
  if(command === '-a') {
    const taskName = args.join(' ')
    if(taskName){
      tasks.push({name: taskName, complered: false});
      listTasks();
      return true
    }
  }
  // complete task
  if(command === '-t'){
    const taskComplete = parseInt(args[0],10);
    
    if(!isNaN(taskComplete) && taskComplete > 0 && taskComplete <= tasks.length && tasks[taskComplete - 1].complete){
      console.log('la tarea ya ha sido completada');
      return true;
    }

    try{
        tasks[taskComplete - 1].complete = true;
        listTasks();
        return true;
    }catch(e){
      console.log('Invalid task number');
      return true;
    }
  }

  if(command === '-r'){
    const taskRemove = parseInt(args[0],10);
    
    if(!isNaN(taskRemove) && taskRemove > 0 && taskRemove <= tasks.length){
      console.log('la tarea ya ha sido completada');
      return true;
    }

    try{
        tasks.splice(taskRemove - 1, 1);
        listTasks();
        return true;
    }catch(e){
      console.log('Invalid task number');
      return true;
    }
  }
  return true;
}


async function main() {
  let continueRunning = true;
  console.log(chalk.magenta('') + chalk.hex('#000').bgMagenta.bold("    Todo List    ") + chalk.magenta(''));
  listTasks();
  while(continueRunning){
    const action = await askQuestion('Todo ');
    continueRunning = await handleAction(action);
  }
}

main();