require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')

const port = 4000

const {CONNECT_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

massive(CONNECT_STRING).then(db => {
  app.set('db', db)
  console.log(`It's working! IT'S WORKING!!!!`)
})

app.listen(port, () => {
  console.log(`It's over Anakin. I have the ${port} port`)
})