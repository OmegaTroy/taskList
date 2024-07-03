import mongodb from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo'

if (!url) {
  console.error('Error: La variable de entorno MONGODB_URI no está definida');
  process.exit(1);
}

const connectDb = async ()=>{
  try{
    await mongodb.connect(url)
  }catch(err){
    console.log(err)
  }
}

mongodb.connection.on('error',err=>{
  console.log(err)
})

export {connectDb,mongodb}


