// require the twitter keys from keys.js
var keys = require('./keys.js');
// require twitter, spotify, request NPM libraries
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// require Node fs library for filesystem access
var fs = require('fs');
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

{// switch based on command line input
switch (functionName) {
	// handle my-tweets
	case 'my-tweets':
	  // console.log("tweets");
	  showTweets();
	  break;
	// handle spotify-this-song:
	case 'spotify-this-song':
	  // console.log("song");
	  mySpotify(functionParameters);
	  break;
	// handle movie-this:
	case 'movie-this':
	  // console.log("movies");
	  movieThis(functionParameters);
	  break;
	// handle do-what-it-says
	case 'do-what-it-says':
	  doWhatItSays();
	  break;
	// default response for invalid command
	default:
	  console.log("Invalid Command. Please try again! Acceptable commands: my-tweets, spotify-this-song, movie-this and do-what-it-says")
}};


// function to display last 20 tweets
function showTweets() {
	// access twitter keys inside keys object
	var client = new Twitter(keys.twitterKeys);
	// twitter search parameters
	var params = {
		screen_name: 'sjm27527',
		count: 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    	if (error) {
    		console.log("Twitter Error");
    	} else {
    		console.log('');
    		console.log('My last 20 tweets: ');
    		console.log('------------------------');
    		tweets.forEach(function(individualTweet) {
    			console.log('Time Posted: ' + individualTweet.created_at);
    			console.log('Tweet: ' + individualTweet.text);
    			console.log('_____________________');
    		});
    	}
    });

}

// function to spotify a song title. Don't forget to handle blank input.
function mySpotify(functionParameters) {
	var spotify = new Spotify({
  		id: "0888876dd4e746b69a275d3c58cd021c",
  		secret: "4afc6e98cbf6417996aa4beb038144c3"
});
 	if(functionParameters < 1) {
 		functionParameters = "The Sign Ace of Base";
 	}
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

// function to OMDB search movie information based on title. Don't forget to handle blank input.
function movieThis(functionParameters) {
	if (functionParameters.length < 1) {
		functionParameters = "Mr. Nobody";
	};
	request("http://www.omdbapi.com/?t=" + functionParameters + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
		if(!error && response.statusCode === 200) {
			console.log("Title: " + JSON.parse(body).Title);
			console.log("imdbRating: " + JSON.parse(body).imdbRating);
			// console.log("Title: " + JSON.parse(body).Ratings[1].Value);
			var rotten;
		      if(!JSON.parse(body).Ratings || !JSON.parse(body).Ratings[1]){
                rotten = "No Rotten Tomatoes Score"
              }
               else {
              rotten = JSON.parse(body).Ratings[1].Value
              }

         console.log("Rotten Tomatoes Rating: " + rotten);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);
		} else {
			console.log("Movie Search Error")
		}

		

	});
}

// function for do-what-it-says using fileserver library.
function doWhatItSays() {
	fs.readFile('random.txt', 'utf8' , function(err, data) {
		if(err) throw err;
		console.log(data);

		var dataArr = data.split(',');

		functionName = dataArr[0].trim();
		functionParameters = dataArr[1].trim();



	// re-use switch for search parameters
	 
	switch (functionName) {
		case 'my-tweets':
	 	  showTweets();
    	  break;
	 	case 'spotify-this-song': 
	 	  mySpotify(functionParameters);
		  break;
	 	case 'movie-this':
	 	  movieThis(functionParameters);
	 	  break;
	 	case 'do-what-it-says':
	 	  doWhatItSays();
		  break;
	 	default:
	 	  console.log("Invalid Command. Please try again!");
		}
	});


}




