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

console.log(APIkeys.twitterKeys);
// Incorporate the "request" npm package for OMDB
var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var userOperand = process.argv[2]; // something else
var fs = require("fs");



// loop for turning the user input into one string--is this needed?

// var userInput=process.argv; // use something else besides process.argv

// var userInfo;

// for (var i = 2; i < userInput.length; i++) {
//  userInput.push(userInfo[i]);
//  }

// create functions to be placed with each corresponding command

// switch statement:
// put this whole thing in a prompt? the switch would be at the end of a promise?
switch (userOperand) {
    case "my-tweets":
        tweets();
        break;
    case "spotify-this-song":
        spotify();
        break;
    case "movie-this":
        movies();
        break;
    case "do-what-it-says":
        autoFS();
        break;
    default:
        helper();
}

// functions

// functions have all of the console logging inside them, and basically everything that statement should produce
// this makes the switch statement cleaner and easier to read, as well as organizes the code so that elements are easier to find
// run defaults 


// ---------TWITTER----------------------------------
// 1. `node liri.js my-tweets`

//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.
function tweets() {
    // Twitter info
    //? var twitterKeys = require('twitter');

    var account = { screen_name: 'megan_thedev' };

    APIkeys.twitterKeys.get('statuses/user_timeline', account, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });

}

// ----------SPOTIFY---------------------------------
// 2. `node liri.js spotify-this-song '<song name here>'`

function spotify() {

    if (somthing) {
        console.log("Artist(s): ");
        console.log("Song Name: ");
        console.log("Preview Link: ");
        console.log("Song Album: ");

    } else {
        // If no song is provided then your program will default to "The Sign" by Ace of Base
        console.log("The Sign by Ace of Base");
    }


    // Spotify info
    // ? var spotifyKeys = require('node-spotify-api');

    APIkeys.spotifyKeys
        .search({ type: 'track', query: 'All the Small Things' })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err);
        });



}


// -----------OMDB-------------------------------- 
//    Like all of the in-class activities, the OMDB API requires an API key. You may use `40e9cece`.
function movies() {

    // example from docs
    // OMDB API request
    request("http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=40e9cece", function(error, response, body) {

        // If there were no errors and the response code was 200 (i.e. the request was successful)...
        if (!error && response.statusCode === 200) {

            // Print out the imdbRating
            console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
        }
    });

    // case entered title of movie, grab this info and display
    if (userInput) {
        console.log("Title: ");
        console.log("Release Year: ");
        console.log("IMBD Rating: ");
        console.log("Rotten Tomatoes Rating: ");
        console.log("Country of Production: ");
        console.log("Language: ");
        console.log("Plot: ");
        console.log("Actors: ");
    } else {
        // case nothing: Mr. Nobody info
        console.log("If you haven't watched 'Mr. Nobody,'' then you should: \n<http://www.imdb.com/title/tt0485947/> \n It's on Netflix!");
    }
}

// -----------FS--------------------------------
// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands.

function autoFS() {
    // take in the string from random.txt, apply it to spotify?

    // example from in-class activities
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        console.log(data);

        // Then split it by commas (to make it more readable)
        var randomData = data.split(", ");

        // Re-display the content as an array for later use.
        console.log(randomData);

    });

}

// ---------DEFAULTS/HELPER MESSAGES----------------------------------     

function helper() {
    console.log("Try one of these commands: \n"+
      "my-tweets\n"+
      "movie-this (followed by the movie's name) \n"+
      "spotify-this-song (followed by the song name) \n"+
      "do-what-it-says");
}









