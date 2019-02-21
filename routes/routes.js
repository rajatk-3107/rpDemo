const express = require('express')
const app = express.Router()

const generateId = require('./generateId')
app.post('/generateId', generateId)

module.exports = app;