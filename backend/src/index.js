'use strict'

const db = require('mongoose')
const express = require('express')
const routes = require('./routes.js')
const cors = require('cors')

// Constants.
const PORT = 5000
const HOST = '0.0.0.0'
const DB_URL='mongodb://mongo/radio_db'
const FRONT_END_HOST = 'http://localhost:8080'

// App
const app = express()

db.connect(DB_URL, {useNewUrlParser: true})

app.use(cors({origin: FRONT_END_HOST}))
app.use(express.json())
app.use(routes)
app.listen(PORT, HOST)
