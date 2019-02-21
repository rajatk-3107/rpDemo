const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.listen(5000, () => {
    console.log("Connected on 5000")
})