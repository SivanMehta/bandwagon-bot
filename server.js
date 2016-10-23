var express = require('express')
var app = express()

require('./bot/bot.js').init(app)

app.use(require('morgan')('dev'));

const PORT = process.env.PORT || 5000
app.set('port', PORT);
var http = require('http').Server(app)

http.listen(PORT, () => {
    console.log("Server started on port " + PORT)
})
