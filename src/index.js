#!/usr/bin/env node
import './commands.js'
import {connectDb} from './db.js'

async function main(){
  await connectDb()
}

main()