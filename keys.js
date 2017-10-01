// API keys here


//    * [Twitter](https://www.npmjs.com/package/twitter)
   
//    * [Spotify](https://www.npmjs.com/package/node-spotify-api)
   
//    * [Request](https://www.npmjs.com/package/request)
     
//      * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com).


console.log('this is loaded');

// Twitter Key
var twitterKeys = ({
  consumer_key: '0ky6W3ODjvJQXo7fKiQYr83v8',
  consumer_secret: 'CMIc4zaGFJ7m4FdNIwV6TgV9JO3fVvMOy1z4yu09XSeOlEEE8f',
  access_token_key: '914110099119050753-hR6ngSldOjLomy3O6HTZBHwMwNRfhA5',
  access_token_secret: 'OxCl0Hc93jxpBCIszmFbG7lLlVJGxNFcSUIr3FQQczwlV'
});

// Spotify Key
var spotifyKeys = ({
  id: '54ac54b73d374231a843b27e35f5c4f9',
  secret: 'e255fa51d1da43f880954b46e8442e2c'
});

// export keys for access in LIRI

module.exports = {
	twitterKeys: twitterKeys,
	spotifyKeys: spotifyKeys
};
