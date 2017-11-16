var myKeys = require("./keys.js");
var fs = require("fs");
var request = require('request');
var inquirer = require("inquirer");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var clear = require('clear');

clear();
console.log("\nWelcome to the LIRI!!!\n(Language Interpretation and Recognition Interface)\n==================================================\nCommand Options:\n==================================================\n1)'my-tweets'\nThis will show your last 20 tweets and when they were created\n\n2)'spotify-this-song' <input song name here>\nThis will show the following information about the song: Artist ,Song name, A Song Preview Link, and the Song Album.\n\n3)'movie-this' <input movie name here>\nThis will give you lots of info for a movie you select. \n\n4)'do-what-it-says'\nThis will randomly call a LIRI command for you.\n==================================================\n" )

//========================================================================
//=========MAIN MENU======================================================
//========================================================================
inquirer.prompt([
  {
    type: "list",
    name: "cmd",
    message: "Please choose a comand:",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "Rando-this!"]
  }

]).then(function(inquirerResponse) {
    if(inquirerResponse.cmd === "my-tweets"){
      twitterGrab();
    }else if(inquirerResponse.cmd === "spotify-this-song"){
      spotSong();
    }else if(inquirerResponse.cmd === "movie-this"){
      movieThis();
    }else if(inquirerResponse.cmd === "Rando-this!"){
      doRando();
    }
});

//========================================================================
//=========TWITTER FUNCT==================================================
//========================================================================

function twitterGrab()
{
  var client = new twitter({
    consumer_key: myKeys.apiKeys.consumer_key,
    consumer_secret: myKeys.apiKeys.consumer_secret,
    access_token_key: myKeys.apiKeys.access_token_key,
    access_token_secret: myKeys.apiKeys.access_token_secret
  });
  clear();
  client.get('favorites/list', {count: 20}, function(error, tweets, response) {
    if(error) throw error;
    console.log(tweets[0].text);
    console.log("====================================\nLast 20 Favorite Tweets:\n");
    for(var i = 0; i < 20; i++)
    {
      console.log((i+1) + ")" + tweets[i].text + "\n" + "Created on " + tweets[i].created_at + "\n");
    }
  });
};

//========================================================================
//=========SPOTIFY FUNCT==================================================
//========================================================================

function spotSong(value)
{
  clear();

  function makeMusic(inquirerResponse)
  {
    var client = new spotify({id: myKeys.apiKeys.spotify_id, secret: myKeys.apiKeys.spotify_secret
    });

    client.search({ type: 'track', query: inquirerResponse.songName, limit: 1})
    .then(function(response) {
      console.log("\nArtist(s): " + response.tracks.items[0].album.artists[0].name);
      console.log("Song name: " + response.tracks.items[0].name);
      console.log("Preview Link: " + response.tracks.items[0].album.external_urls.spotify);
      console.log("From the album: " + response.tracks.items[0].album.name + "\n");
      console.log("______##__##________________8____________________8888888888888888_________");
      console.log("___##########______________88___________________88            88__________");
      console.log("____##  ##_______________88__88_8______________8888888888888888___________");
      console.log("_##########_____________88____88______________88____________88____________");
      console.log("__##__##______________88_____________________88____________88_____________");
      console.log("_____________________88_____________________88____________88______________");
      console.log("________________888888__________________888888________888888______________");
      console.log("_______________88   88_________________88   88_______88   88______________");
      console.log("_______________88   88_________________88   88_______88   88______________");
      console.log("________________88888___________________88888_________88888_______________");

    })
    .catch(function(err) {
      console.log(err);
    });
  };

  console.log("Spotify song information getter thingy!");
  console.log("=======================Default is I'll follow the sun=======================");
  inquirer.prompt([
    {
      type: "input",
      name: "songName",
      message: "Type in a song name: ",
      default: "I'll follow the sun"
    }
  ]).then(function(inquirerResponse)
    {
      makeMusic(inquirerResponse);
    });
};

//========================================================================
//=========OMDB FUNCT==================================================
//========================================================================

function movieThis(){
  clear();
  console.log("Movie information getter thingy!");
  console.log("==============================Default is: Jaws==============================");
  inquirer.prompt([
    {
      type: "input",
      name: "movieName",
      message: "Type in a movie name: ",
      default: "Jaws"
    }
  ]).then(function(inquirerResponse) {
      var queryUrl = "http://www.omdbapi.com/?t=" + inquirerResponse.movieName + "&apikey=40e9cece";
      request(queryUrl, function (error, response, body) {
        var movieInfo = JSON.parse(body);
        console.log('Title:', movieInfo.Title);
        console.log('Year:', movieInfo.Year);
        console.log('Rated:', movieInfo.Rated);
        console.log('Rotten Tomatoes:', movieInfo.Ratings[1].Value);
        console.log('Production Country:', movieInfo.Country);
        console.log('Language:', movieInfo.Language);
        console.log('Plot:', movieInfo.Plot);
        console.log('Leading Actors:', movieInfo.Actors + "\n");
        console.log("            888888     888888               ||__||              ||__||     ");
        console.log("          88      88 88      88             ||__||88888888888888||__||     ");
        console.log("           88____88   88____88              ||__||              ||__||     ");
        console.log("         8888888888888888888888   8888      ||__||              ||__||     ");
        console.log("         88                  88 88   8      ||__||              ||__||     ");
        console.log("         88                  88 88   8      ||__||88888888888888||__||     ");
        console.log("         8888888888888888888888   8888      ||__||              ||__||     ");
      });
  });
};

function doRando(){
  console.log("\nCommand funct doRando was started.");
  var dataArray;
  fs.readFile("random.txt", "utf8", function(data, error) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    dataArray = dataArr;
  });
  //console.log("dataArray: " + dataArray);
  spotSong(dataArray);
};
