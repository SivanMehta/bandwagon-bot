var express = require('express')
var app = express()

// initialize logging
var morgan = require('morgan')
app.use(morgan('dev'))

// initialize bot
require('./bot/bot.js').init(app)

// get correct port
const PORT = process.env.PORT || 5000
app.set('port', PORT);
var http = require('http').Server(app)

// Start Application
http.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
