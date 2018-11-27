/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

//DOM = document object model (the box model that can be interacted with)



//Math object is a built-in js object that has a lot of mathematical properties, like the 
//random method (num between 0-1)
//floor method removes the decimal in a number


//sets the value of the dice to a random value from 1 - 6.  
//dice = Math.floor(Math.random() * 6) + 1;
//console.log(dice);

//document object allows you to manipulate the DOM
//document.querySelector('#current-' + activePlayer).textContent = dice; 

//query selector selects like CSS using a string, but it only selects the first element that it finds.
//textContent method allows you to alter text content.  (but only text)
//Thanks to type coercion, js will turn this into '#current-0 or #current-1.
//That means that the correct player's box will be altered.


//this uses HTML in the js.  innerHTML must use strings, or the parser thinks it is js.
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'  //italics

//stores DOM content into a variable
//var x = document.querySelector('#score-0').textContent;

//console.log(x);

//.stlye accesses the css, '.dice' accesses the dice class, and .display = 'none'; sets the display to off

// a "getter" gets a value from the DOM, a "setter" sets a value

//.addEventlistener uses the type of event, then the function that will immediately be called.


//document.querySelector('.btn-roll').addEventListener('click', btn); no parentheses, because you don't want to call it.
//you want the listener to call it.
// btn is a callback function, because it is an argument in another function.

//document.querySelector('.btn-roll').addEventListener('click', function () {
    //this is an anonymous function, because it doesn't have a name, and is called directly from the eventlistener.
//});
// anonymous functions can't be used elsewhere
var scores, 
    roundScore,
    activePlayer,
    dice0,
    dice1,
    lastDice0,
    lastDice1,
    gamePlaying,
    winningScore;

init();
    //the following bits of code got added to the init function.
    //document.querySelector('.dice').style.display = 'none';

    //get elementbyID doesn't require a # selector
    /*
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    */
document.querySelector('.btn-roll').addEventListener('click', function() {
        //checks to see if game is playing
    if (gamePlaying){
            //function gets a random number between 1 and 6. 
        var dice0 = Math.floor(Math.random() * 6) + 1;
        var dice1 = Math.floor(Math.random() * 6) + 1;
            //display the result
        document.getElementById('dice0').style.display = 'block';
        document.getElementById('dice1').style.display = 'block';
        document.getElementById('dice0').src = 'dice-' + dice0 + '.png';
        document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
            //update the score IF the result ! 1
            // !== is the Different operator, no type coercion (the norm)
            //makes you lose your turn if two sixes are rolled in a row.
        if(dice0 === lastDice0 && dice0 === 6){
            loseScore();
        }else if(lastDice1 === 6 && dice1 === 6){
            loseScore();
        }else if(dice0 !== 1 && dice1 !== 1) {
                //adds to roundscore 
            roundScore += dice0 + dice1; 
                //sets the text content of the roundScore
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            lastDice0 = dice0;
            lastDice1 = dice1;
        } else{
            nextPlayer();
        }
    } 
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
            //add current score to global score
            //update ui to reflect changes
        scores [activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
            //set round score for active player to 0
        roundScore = 0;
            //check if player won the game

            //Selects the value from an input field, and stores it as a variable.
        var input =document.querySelector('.final-score').value
            //undefined, 0, null, or "" are coerced to false
            //anything else is coerced to true

            //if there is an input, that becomes the winning score
        if(input){
            winningScore = input;
        } else{
            winningScore = 100;
        }
        console.log(winningScore);
        if (scores[activePlayer] >= winningScore){
            console.log(winningScore);
            document.getElementById('name-' + [activePlayer]).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            gamePlaying = false;
        } else {
            nextPlayer();
        }
        //switch active player, and toggle the 'active' class
    }   
    
});

document.querySelector('.btn-new').addEventListener('click', init); 
    //no parentheses for init, so that the function is passed into the argument, instead
    //of being called immediately.

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    //removing a class
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    hideDice();
}
    /*  
    My function, this is replaced by Jonas's function. (init)
    function resetGame(){
        scores = [0,0];
        roundScore = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        document.getElementById('score-0').textContent = 0;
        document.getElementById('score-1').textContent = 0;
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
        document.getElementById('name-' + [activePlayer]).textContent = 'Player ' + activePlayer;
        activePlayer = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    }
    */

    //toggle CSS classes, instead of messily trying to create them in the CSS.

function init(){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    hideDice();
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
        //yes, we remove 'active' from player 0, and then add it.  This is to prevent player zero from having two cases of 'active'
}

function loseScore(){
    scores[activePlayer] = 0;
    document.getElementById('score-' + activePlayer).textContent = '0';
    nextPlayer();
}
function hideDice(){
    document.getElementById('dice0').style.display='none';
    document.getElementById('dice1').style.display='none';
}
//state variable is introduced.  It shares the condition of a system.

/*************************************
 * Challenge #1
 * 
 * 1.  Lose score if 2 sixes in a row.  (save the previous dice roll as a separate variable) Done!
 * 2.  Add an input field so that people can change the winning score requirement.  (.value property, google)
 * 3.  Now make it two dice!  You lose your roundScore if one of the dice is a 1.  
 */