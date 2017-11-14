console.log("\nWelcome to the LIRI!!!\n(Language Interpretation and Recognition Interface)\n==================================================\nCommand Options:\n==================================================\n1)'my-tweets'\nThis will show your last 20 tweets and when they were created\n\n2)'spotify-this-song' <input song name here>\nThis will show the following information about the song: Artist ,Song name, A Song Preview Link, and the Song Album.\n\n3)'movie-this' <input movie name here>\nThis will give the following info for a movie:\nTitle of the movie\nYear the movie came out\nIMDB Rating of the movie\nRotten Tomatoes Rating of the movie\nCountry where the movie was produced\nLanguage of the movie\nPlot of the movie\nActors in the movie.\n\n4)'do-what-it-says'\nThis will randomly call a LIRI command for you.\n==================================================\n" )

var mykeys = require("./keys.js");
var fs = require("fs");
var request = require('request');
var inquirer = require("inquirer");
var twitter = require("twitter");
var nodeSpotifyApi = require("node-spotify-api");


inquirer.prompt([
  {
    type: "list",
    name: "cmd",
    message: "Please choose a comand:",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  }

]).then(function(inquirerResponse) {
    console.log("\nCommand was: " + inquirerResponse.cmd);
    if(inquirerResponse.cmd === "my-tweets"){
      twitterGrab();
    }else if(inquirerResponse.cmd === "spotify-this-song"){
      spotSong();
    }else if(inquirerResponse.cmd === "movie-this"){
      movieThis();
    }else if(inquirerResponse.cmd === "do-what-it-says"){
      doRando();
    }
});

function twitterGrab(){
  console.log("\nCommand funct twitterGrab was done.");
};

function spotSong(){
  console.log("\nCommand funct spotSong was done.");
};

function movieThis(){
  console.log("\nCommand funct movieThis was done.");
  var movieName = "Jaws";
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  console.log(queryUrl);

  request(queryUrl, function (error, response, body) {
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  });
};

function doRando(){
  console.log("\nCommand funct doRando was done.");
};
