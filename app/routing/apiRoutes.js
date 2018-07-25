var path = require("path");
var fs = require("fs");
var bodyParser = require("body-parser");
var friends = require("../../app/data/friends.js");
// var friends = fs.readFileSync(path.join(__dirname, "../../app/data/friends.js"));
// friends = JSON.parse(friends);

module.exports = function (app) {

    // * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function (req, res) {
        console.log("we're in the 'app.get(api/friends' ");
        // console.log(friends)

        fs.readFile("app/data/friends.js", "utf8", function (err, data) { //reads file, gets an array, compares, pushes, writes
            res.send(JSON.parse(data));
        });
        //The below used to work!
        //return res.send(friends); // return contents of friends.js file
    }); // end $appget

    //   * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic. 
    app.post("/api/friends", function (req, res) {
        // req.body hosts is equal to the JSON post sent from the user. This works because of our body-parser middleware
        var newFriend = req.body;
        var userScores = req.body.scores;
        var lowestDiff = 100; // set the closest diff to be quite large, the first user should reset this

        fs.readFile("app/data/friends.js", "utf8", function (err, data) { //reads file, gets an array, compares, pushes, writes
            if (err) { console.log(err) }
            else {
                var friendsArray = JSON.parse(data); // make friends.js more usable.
                var similarFriend;
                for (var f = 0; f < friendsArray.length; f++) { //loop across all friends
                    var singleDifference = 0; // reset singDiff every round. Low difference is closer match
                    console.log(f + "-f, lowest is " + lowestDiff);
                    for (var i = 0; i < 10; i++) {
                        singleDifference += Math.abs(friendsArray[f].scores[i] - req.body.scores[i])
                    }
                    console.log(f + "-f, singleDiff is " + singleDifference);

                    if (singleDifference <= lowestDiff) { // after for loop completes, do comparison against best thus far
                        lowestDiff = singleDifference; // this user's a better match. reset the lowest # & save this friend
                        similarFriend = friendsArray[f]; // if there's a tie, we'll do the last one seen
                    }
                }
                friendsArray.push(newFriend);
                res.json(similarFriend);
                console.log("similar friend is " + JSON.stringify(similarFriend));
                fs.writeFile("app/data/friends.js", JSON.stringify(friendsArray), function (err) {
                    if (err) { console.log(err) }
                    else { console.log("New Friend written") }
                });
            }
        }) // end fs.readFile

        // Using a RegEx Pattern to remove spaces from newCharacter
        // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
        // console.log(newFriend);
        // need to appendFile here the newFriend to friends.js
        // res.json(newFriend);
    });

}