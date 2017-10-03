// # LIRI Bot

// ### Overview

// In this assignment, you will make LIRI. LIRI is like iPhone's SIRI. 
// However, while SIRI is a Speech Interpretation and Recognition Interface, 
// LIRI is a _Language_ Interpretation and Recognition Interface. 
// LIRI will be a command line node app that takes in parameters and gives you back data.

// -------------------------------------------

// Start!

// import keys grabbing the data from keys.js and putting it into a variable
var APIkeys = require("./keys.js");

//console.log(APIkeys.twitterKeys);


// Incorporate the "request" npm package for OMDB
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirer = require("inquirer"); // for prompt
var userOperand = process.argv[2]; // the operator for deciding which function to use
var userInput = process.argv;
var inputString = "";
var fs = require("fs");

// separate words will be made into a string
// Capture all the words after the operand
// for (var i = 3; i < userInput.length; i++) {
//     // (ignoring the first three Node arguments)
//     // building a string
//     userInput.push(userInput[i]);


// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
function stringMaker() {
    for (var i = 3; i < userInput.length; i++) {

        if (i > 3 && i < userInput.length) {

            inputString = inputString + "+" + userInput[i];

        } else {

            inputString += userInput[i];

        }
    }
}

stringMaker();
// switch statement:
switch (userOperand) {
    case "my-tweets":
    case "tweets":
        tweets();
        break;
    case "spotify-this-song":
    case "song":
        // take out the if-else statements and put into a function, put the other function inside it.
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

// functions

// functions have all of the console logging inside them, and basically everything that statement should produce
// this makes the switch statement cleaner and easier to read, as well as organizes the code so that elements are easier to find
// run defaults 

// ######### WORKING ##############
// ---------TWITTER----------------------------------
// 1. `node liri.js my-tweets`

//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.
function tweets() {
    // Twitter info
    //? var twitterKeys = require('twitter');
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

// ######### I NEED HELP ##############
function spotifyDefault() {
    // If no song is provided then your program will default to "The Sign" by Ace of Base
    inputString = "The Sign by Ace of Base";
    console.log("Undefined. Here is \'The Sign\' by Ace of Base instead. If you don\'t like that, then put in something else.");
    // runs spotify function with the default user input
    spotify();
}

// ######### I NEED HELP ##############
// -----------OMDB-------------------------------- 
//    API key `40e9cece`.
function movies() {
    var call = "http://www.omdbapi.com/?t=" + inputString + "&y=&plot=short&apikey=40e9cece";
    // example from docs
    // OMDB API request
    request(call, function(error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
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


    //RYAN--console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);



}

// ######### WORKING ##############
function movieDefault() {
    // If no movie is provided, then Mr. Nobody is
    inputString = "Mr. Nobody";
    console.log("Your input is undefined. Here is the film \'Mr. Nobody\'. If you haven't watched \'Mr. Nobody\', then you should: \n<http://www.imdb.com/title/tt0485947/> \n It's on Netflix! If you don\'t like that, then put in something else.");
    // movie function with the default user input
    movies();
}

// -----------FS--------------------------------
// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands.

// ######### I NEED HELP ##############
function autoFS() {
    // take in the string from random.txt, apply it to spotify?


    var randomData = "";
    // example from in-class activities
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        randomData = data.split(", ");

        // Re-display the content as an array for later use.
        console.log(randomData);

    });

    // put random data into spotify?
    spotify(randomData);

}

// ######### WORKING ##############
// ---------DEFAULTS/HELPER MESSAGES----------------------------------     

function helper() {
    console.log("Try one of these commands: \n" +
        "my-tweets\n" +
        "movie-this (followed by the movie's name) \n" +
        "spotify-this-song (followed by the song name) \n" +
        "do-what-it-says");
}