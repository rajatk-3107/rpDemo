const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const routes = require('./routes/routes')
app.use('/api', routes)

app.use(express.static(path.join(__dirname, 'dist/razorpay-angular-integration')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/razorpay-angular-integration/index.html'));
});



app.listen(5000, () => {
    console.log("Connected on 5000")
})