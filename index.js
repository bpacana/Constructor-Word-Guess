//// Initialize Constructor
var Word = require("./word.js");
var inquirer = require("inquirer");

// letters array
var letterArray = "abcdefghijklmnopqrstuvwxyz";

// List of words to choose from
var DisneyMovies = ["aladdin", "alice in wonderland", "bambi", "beauty and the beast", "bolt", "brave", "cars", "chicken little", "cinderella", "dumbo", "fantasia", "finding nemo", "hercules", "lady and the tramp", "monsters inc", "mulan", "peterpan", "pinocchio", "pochahontas", "ratatouille", "tangled", "tarzan", "the incredibles", "the lion king", "the little mermaid", "the princess and the frog", "the tigger movie", "toy story", "up", "who framed roger rabbit"];

// Pick Random index from DisneyMovies array
var randomIndex = Math.floor(Math.random() * DisneyMovies.length);
var randomWord = DisneyMovies[randomIndex];

// Pass random word through Word constructor
computerWord = new Word(randomWord);

var requireNewWord = false;

// Array for guessed letters
var incorrectLetters = [];
var correctLetters = [];

// Guesses left
var guessesLeft = 10;

function knowledge() {

    // Generates new word for Word constructor if true
    if (requireNewWord) {
        // Selects random DisneyMovies array
        var randomIndex = Math.floor(Math.random() * DisneyMovies.length);
        var randomWord = DisneyMovies[randomIndex];

        // Passes random word through the Word constructor
        computerWord = new Word(randomWord);

        
        requireNewWord = false;
    }


    // TestS if a letter guessed is correct
    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    // letters remaining to be guessed
    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Guess a letter between A-Z!",
                    name: "userinput"
                }
            ])
            .then(function (input) {

               
                if (!letterArray.includes(input.userinput) || input.userinput.length > 1) {
                    console.log("\nPlease try again!\n");
                    knowledge();
                } else {

                   
                    if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || input.userinput === "") {
                        console.log("\nAlready Guessed or Nothing Entered\n");
                        knowledge();
                    } else {

                        // Checks if guess is correct
                        var wordCheckArray = [];

                        
                        computerWord.userGuess(input.userinput);

                        // Checks if guess is correct
                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join('') === wordComplete.join('')) {
                            console.log("\nIncorrect\n");
                           
                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");
                           
                            correctLetters.push(input.userinput);
                        }

                        
                        computerWord.log();

                        // Print guesses left
                        console.log("Guesses Left: " + guessesLeft + "\n");

                        // Print letters guessed already
                        console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                        // Guesses left
                        if (guessesLeft > 0) {
                            // Call function 
                            knowledge();
                        } else {
                            console.log("Sorry, you lose!\n");

                            restartGame();
                        }


                        
                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            })
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

   
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would you like to:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                knowledge();
            } else {
                return
            }
        })
}

knowledge();

