const express = require('express')
const app = express()
const expressLayouts = require("express-ejs-layouts")
const bodyParser = require('body-parser')
require('dotenv/config')

const indexRouter = require('./routes/index')
const graduateRouter = require('./routes/graduates')
const bookRouter = require('./routes/books')



app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}))


const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/graduates', graduateRouter)
app.use('/books', bookRouter)

app.listen('3000')