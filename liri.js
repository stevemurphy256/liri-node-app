// require the twitter keys from keys.js
var keys = require('./keys.js');
// require twitter, spotify, request NPM libraries
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// require Node fs library for filesystem access
var fs = require('fs');
// access twitter keys inside twitterKeysObject
var client = new twitter(keys.twitterKeys);

// possible command line inputs include:
// my-tweets, spotify-this-song, movie-this, do-what-it-says
// save command to variable and use switch
var functionName = process.argv[2];
// grab user command argument
var functionParameters = "";
var nodeArgs = process.argv;

 for (var i = 3; i < nodeArgs.length; i++){
        if (i > 3 && i < nodeArgs.length){
            functionParameters = functionParameters + "+" + nodeArgs[i];
        }
        else {
            functionParameters += nodeArgs[i];
        }
    }

// switch based on command input
switch (functionName) {
	// handle my-tweets
	case 'my-tweets':
	console.log(tweets);
		showTweets();
		break;
	// handle spotify-this-song:
	case 'spotify-this-song':
		  mySpotify(functionParameters);
		  break;
	// handle movie-this:
	case 'movie-this':
		movieThis(functionParameters);
		break;
	// handle do-what-it-says
	case 'do-what-it-says':
	    doWhatItSays();
	break;
	// default response for invalid command
	default:
		console.log("Invalid Command. Please try again!")
}

function mySpotify(functionParameters) {
	var spotify = new Spotify({
  		id: "0888876dd4e746b69a275d3c58cd021c",
  		secret: "4afc6e98cbf6417996aa4beb038144c3"
});
 
spotify.search({ type: 'track', query: functionParameters }, function(err, data) {
  if (err) {
  	console.log('Error occurred: ' + err);
    return;
  } else {
  	var songData = data.tracks.items[0];
  	var songResult = console.log(songData.artists[0].name)
  		console.log(songData.name)
  		console.log(songData.preview_url)
  		console.log(songData.album.name)
  	}
 
// console.log(data); 
});
}



// if my-tweets argument is received
// function myTweets() {
// 	// set up object fot twitter credentials
// 	var client = new Twitter({
// 	  consumer_key: '',
// 	  consumer_secret: '',
// 	  access_token_key: '',
// 	  access_token_secret: ''
// });
 
// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });




