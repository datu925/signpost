//Lets require/import the HTTP module
var express = require('express');
var server = express();

const PORT=8080;

server.get("/", function(req, res) {
  res.send('Hello, world');
});

server.use(express.static('public'));

server.listen(PORT, function() {
  console.log('Example app listening to ' + PORT)
})
