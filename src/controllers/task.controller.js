import Task from '../model/Task.js'
import {mongodb} from '../db.js'
import chalk from 'chalk'

const addTask = async(task)=>{
    await Task.create(task)
}

const listTask = async()=>{
  const tasks = await Task.find()
  tasks.forEach((task,index)=>{
    if(task.completed){
      console.log(`${index}. ` + chalk.green.bold(`${task.completed ? '✔ ' : '❌'} ${task.name}, id: ${task._id}`))
      return
    }
    console.log(`${index}. ` + chalk.red.bold(`${task.completed ? '✔' : '❌'} ${task.name}, id: ${task._id}`))
  })
  console.log('\n')
  await mongodb.connection.close()
  process.exit(0)
}

const updateTask = async(_id,newTask)=>{
  const task = await Task.findOne({_id})
  if(newTask.name === '') {
    await Task.updateOne({_id},{$set:{completed:!task.completed}})
  }else{
    await Task.updateOne({_id},newTask)
  }
}

const removeTask = async(_id)=>{
  await Task.deleteOne({_id})
}

export {addTask,listTask, updateTask,removeTask}