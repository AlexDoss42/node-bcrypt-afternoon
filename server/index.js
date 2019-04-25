require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const authCtrl = require('./controllers/authController')

const port = 4000

const {CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

app.use(express.json())

massive(CONNECTION_STRING).then(db => {
  app.set('db', db)
  console.log(`It's working! IT'S WORKING!!!!`)
}).catch(() => console.log('It is broke at the massive invocation'))

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)

app.listen(port, () => console.log(`It's over Anakin. I have the ${port} port`))