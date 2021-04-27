const express = require("express")
const bodyParser = require("body-parser")
const urlencoder = bodyParser.urlencoded({
    extended: true
})
const path = require("path")
var app = new express()

require('dotenv').config()

app.use(urlencoder)
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))
app.use(require("./api"))

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running at port 3000...")
})