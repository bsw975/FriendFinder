var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs =  require("fs");
// var friends = require("./app/data/friends.js")
// console.log(friends);

//do I need these two created as a variable?!?

// var htmlRoutes = require("./app/routing/htmlRoutes.js")

var app = express();
var PORT = 7419;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app/public'));

require("./app/routing/apiRoutes.js")(app); // (app) represents the argument used in 'apiRoutes.js'
// app.post("/api/friends", function (req, res) {
//     // req.body hosts is equal to the JSON post sent from the user
//     // This works because of our body-parser middleware
//     var newFriend = req.body;
//     console.log("req.body is " + JSON.stringify(req.body))
// })
// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });