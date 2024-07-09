import chalk from 'chalk'

const URL = 'aqui va la url de la api'

const addTask = async(task)=>{
    await fetch(URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

const listTask = async()=>{
  const data = await fetch(URL)
  const tasks = await data.json()

  if(tasks.length === 0){
    console.log('No hay tareas pendientes')
    process.exit(0)
  }
  tasks.forEach((task,index)=>{
    if(task.completed){
      console.log(`${index}. ` + chalk.green.bold(`${task.completed ? '✔ ' : '❌'} ${task.name}, id: ${task._id}`))
      return
    }
    console.log(`${index}. ` + chalk.red.bold(`${task.completed ? '✔' : '❌'} ${task.name}, id: ${task._id}`))
  })
  console.log('\n')
  process.exit(0)
}

const updateTask = async(_id,newTask)=>{
  
  await fetch(`${URL}/${_id}`,{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTask)
  })

}

const removeTask = async(_id)=>{
  await fetch(`${URL}/${_id}`,{
    method: 'DELETE'
  })
}

export {addTask,listTask, updateTask,removeTask}
