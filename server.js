const express = require('express')
const app = express();
const expressLayouts = require("express-ejs-layouts")
const indexRouter = require('./routes/index')
require('dotenv/config')

app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose= require('mongoose')
mongoose.connect(process.env.MONGODB, { useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.log(error))
db.on('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)