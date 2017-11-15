console.log("\nWelcome to the LIRI!!!\n(Language Interpretation and Recognition Interface)\n==================================================\nCommand Options:\n==================================================\n1)'my-tweets'\nThis will show your last 20 tweets and when they were created\n\n2)'spotify-this-song' <input song name here>\nThis will show the following information about the song: Artist ,Song name, A Song Preview Link, and the Song Album.\n\n3)'movie-this' <input movie name here>\nThis will give you lots of info for a movie you select. \n\n4)'do-what-it-says'\nThis will randomly call a LIRI command for you.\n==================================================\n" )

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
  console.log("\nCommand funct movieThis was started.");

  inquirer.prompt([
    {
      type: "input",
      name: "movieName",
      message: "Type in a movie name: "
    }
  ]).then(function(inquirerResponse) {
      var queryUrl = "http://www.omdbapi.com/?t=" + inquirerResponse.movieName + "&apikey=40e9cece";
      console.log(queryUrl);
      request(queryUrl, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log("\n==================================================\n");
        var movieInfo = JSON.parse(body);
        console.log('Title:', movieInfo.Title);
        console.log('Year:', movieInfo.Year);
        console.log('Rated:', movieInfo.Rated);
        console.log('Rotten Tomatoes:', movieInfo.Ratings[1].Value);
        console.log('Production Country:', movieInfo.Country);
        console.log('Language:', movieInfo.Language);
        console.log('Plot:', movieInfo.Plot);
        console.log('Leading Actors:', movieInfo.Actors);
      });
  });
};

function doRando(){
  console.log("\nCommand funct doRando was done.");
};
