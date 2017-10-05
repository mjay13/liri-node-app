// -------------------------------------------
//     ######### LIRI BOT ##############
// -------------------------------------------

// ### Overview

// In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. 
// However, while SIRI is a Speech Interpretation and Recognition Interface, 
// LIRI is a _Language_ Interpretation and Recognition Interface. 
// LIRI will be a command line node app that takes in parameters and gives you back data.

// -------------------------------------------
//     ######### START! ##############
// -------------------------------------------

var APIkeys = require("./keys.js"); // import keys grabbing the data from keys.js and putting it into a variable
var request = require("request"); // for omdb
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer"); // for prompt
var userOperand = process.argv[2]; // the operator for deciding which function to use
var userInput = process.argv;
var inputString = "";
var fs = require("fs");


stringMaker();

// switch statement:
switch (userOperand) {
    case "my-tweets":
    case "tweets":
        tweets();
        break;
    case "spotify-this-song":
    case "song":
        if (inputString === undefined) {
            spotifyDefault();
        } else {
            spotify();
        }
        break;
    case "movie-this":
    case "movie":
        if (inputString === undefined) {
            movieDefault();
            // If no movie is provided, then Mr. Nobody is
            //inputString = "Mr. Nobody";
            //console.log("Your input is undefined. Here is the film \'Mr. Nobody\'. If you haven't watched \'Mr. Nobody\', then you should: \n<http://www.imdb.com/title/tt0485947/> \n It's on Netflix! If you don\'t like that, then put in something else.");
            // movie function with the default user input
            //movies();
        } else {
            movies();
        }
        break;
    case "do-what-it-says":
    case "whatever":
        autoFS();
        break;
    default:
        helper();
}

// -------------------------------------------
//     ######### FUNCTIONS ##############
// -------------------------------------------

// Loop through all the words in the node argument to make it into a string
function stringMaker() {
    for (var i = 3; i < userInput.length; i++) {

        if (i > 3 && i < userInput.length) {

            inputString = inputString + "+" + userInput[i];

        } else {

            inputString += userInput[i];

        }
    }
}

// ######### WORKING ##############
// ---------TWITTER----------------------------------

function tweets() {

    var tKeys = new Twitter(
        APIkeys.twitterKeys
    );

    var account = { screen_name: 'megan_thedev', count: 20 };

    tKeys.get('statuses/user_timeline', account, function(error, tweets, response) {
        if (error) {
            console.log(tweets);
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
        console.log("------------------------------------------------------");
    });

}


// ######### WORKING ##############
// ----------SPOTIFY---------------------------------

function spotify() {

    var sKey = new Spotify(
        APIkeys.spotifyKeys
    );

    sKey
        .search({ type: 'track', query: inputString, limit: 1 },
            function(err, data) {

                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                var songData = data.tracks.items[0];

                console.log("######### Your results for the song \'" + inputString + "\': ##########");
                console.log("------------------------------------------------------");
                console.log("Artist(s): " + songData.artists[0].name);
                console.log("Song Name: " + songData.name);
                console.log("Preview Link: " + songData.preview_url);
                console.log("Song Album: " + songData.album.name);
                console.log("------------------------------------------------------");
                // console.log(songData);
            });

}

// ######### not working ##############

function spotifyDefault() {
    // If no song is provided then your program will default to "The Sign" by Ace of Base
    inputString = "The Sign by Ace of Base";
    console.log("Undefined. Here is \'The Sign\' by Ace of Base instead. If you don\'t like that, then put in something else.");
    // runs spotify function with the default user input
    spotify();
}


// ######### I WORK! ##############
// -----------OMDB-------------------------------- 

function movies() {
    var call = "http://www.omdbapi.com/?t=" + inputString + "&y=&plot=short&apikey=40e9cece";

    request(call, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            var mText = JSON.parse(body);

            console.log("------------------------------------------------------");
            console.log("Title: " + mText.Title);
            console.log("Release Year: " + mText.Year);
            console.log("IMBD Rating: " + mText.imdbRating);
            console.log("Rotten Tomatoes Rating: " + mText.Ratings[1].Value);
            console.log("Country of Production: " + mText.Country);
            console.log("Language: " + mText.Language);
            console.log("Plot: " + mText.Plot);
            console.log("Actors: " + mText.Actors);
            console.log("------------------------------------------------------");

        }
    });

}

// ######### not working ##############
function movieDefault() {
    // If no movie is provided, then Mr. Nobody is
    inputString = "Mr. Nobody";
    console.log("Your input is undefined. Here is the film \'Mr. Nobody\'. If you haven't watched \'Mr. Nobody\', then you should: \n<http://www.imdb.com/title/tt0485947/> \n It's on Netflix! If you don\'t like that, then put in something else.");
    // movie function with the default user input
    movies();
}

// -----------FS--------------------------------
// ######### WORKING ##############

function autoFS() {
    
    // take in the string from random.txt, apply it to spotify

    var randomData = "";
  
    fs.readFile("random.txt", "utf8", function(err, data) {

        // If the code experiences any errors it will log the error to the console.
        if (err) {
            return console.log(err);
        }

        randomData = data.split(",");
        //console.log(randomData);

        inputString = randomData[1];
        //console.log(inputString);

        spotify();

    });

}

// ######### WORKING ##############
// ---------DEFAULTS/HELPER MESSAGES----------------------------------     

function helper() {
    console.log("------------------------------------------------------");
    console.log("Try one of these commands: \n" +
        "my-tweets\n" +
        "movie-this (followed by the movie's name) \n" +
        "spotify-this-song (followed by the song name) \n" +
        "do-what-it-says");
    console.log("------------------------------------------------------");
}