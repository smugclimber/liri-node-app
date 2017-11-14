console.log("Welcome to the LIRI!!!\n(Language Interpretation and Recognition Interface)\nPlease enter one of the following request commands below:\n1)'total' to recieve your account balance\n2)'deposit <amount>' where deposit is followed by a space and an amount to deposit" )

var mykeys = require("./keys.js");
var inquirer = require("inquirer");
var twitter = require("twitter");
var node-spotify-api = require("node-spotify-api");


inquirer.prompt([
  {
    type: "list",
    name: "cmd",
    message: "Please choose a comand:",
    choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
  };

]).then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    console.log("\nCommand was: " + inquirerResponse.cmd);
});
