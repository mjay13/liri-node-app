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

// Twitter info
//? var twitterKeys = require('twitter');
 
var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});

// Spotify info
// ? var spotifyKeys = require('node-spotify-api');
 
spotify
  .search({ type: 'track', query: 'All the Small Things' })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });

  

  // loop for turning the user input into one string--is this needed?

var userInput=process.argv; // use something else besides process.argv

var userInfo;

for (var i = 2; i < userInput.length; i++) {
	userInput.push(userInfo[i]);
	}

// create functions to be placed with each corresponding command
 // switch statement:
 
 //   * `my-tweets`
        // function tweets()

//    * `spotify-this-song`
        // spotify()

//    * `movie-this`
        // movies()

//    * `do-what-it-says` 
        // autoFS()

//    * defualt
        // helper()

// functions

// functions have all of the console logging inside them, and basically everything that statement should produce
// this makes the switch statement cleaner and easier to read, as well as organizes the code so that elements are easier to find
// run defaults 


// ---------TWITTER----------------------------------
// 1. `node liri.js my-tweets`

//    * This will show your last 20 tweets and when they were created at in your terminal/bash window.
function tweets() {

}

// ----------SPOTIFY---------------------------------
// 2. `node liri.js spotify-this-song '<song name here>'`

//    * This will show the following information about the song in your terminal/bash window
     
//      * Artist(s)
     
//      * The song's name
     
//      * A preview link of the song from Spotify
     
//      * The album that the song is from

//    * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
//    * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

//    * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
//    * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

//    * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

//    * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api). See the 

function spotify() {

}


// -----------OMDB--------------------------------
// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
//      * It's on Netflix!
   
//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `40e9cece`.

function movies() {

}

// -----------FS--------------------------------
// 4. `node liri.js do-what-it-says`
   
//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

function autoFS() {

}

// ---------DEFAULTS/HELPER MESSAGES----------------------------------     
//      * Feel free to change the text in that document to test out the feature for other commands. 

function helper() {

}