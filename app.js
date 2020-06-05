/*
GAME RULES:

- This game supports 2 players, each taking turns
- In each player's turn, the player is able to roll a six-sided die as many times as they'd like.  Each roll is added to their current round's score.
- However, if a player rolls a 1, their round's score is forefit, and the next player goes.
- The player can, at any time their current round's score is greater than 0, opt to 'Hold', which adds their current round's score to their total score and changes turns.
- The first player to 100 points in their total score wins the game.
*/

/**********VARIABLES***********/
// scores - array to keep global score of either player
// roundScore - running total score during a player's turn
// playerTurn - represents which player's turn it is: 0 for Player 1, 1 for Player 2
// gameOn - Boolean state variable signifying if the game is in progress or done with
// lastRoll - variable set to the value of the dice that was most previously rolled

var scores, roundScore, playerTurn, gameOn, lastRoll, scoreLimit;

// initialize a new game
newGame();

/*********EVENT LISTENERS********/

// roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameOn) {
       // 6-sided dice roll
       var dice = Math.floor((Math.random() * 6)) + 1;
       // if double 6 is rolled, reset the player's score (array) and update the UI
       if (dice === 6 && lastRoll === 6) {
           console.log('double sixes');
           scores[playerTurn] = 0;
           document.querySelector('#score-' + playerTurn).textContent = '0';
           // next, change the player's turn
           changePlayerTurn();
       }
       else {
           lastRoll = dice;
           console.log(lastRoll);
       }
       // 2. Display the Result
           var diceDOM = document.querySelector('.dice'); // storing the selection: this is set so we don't have to retype everything a bunch of times.
           diceDOM.style.display = 'block';  // displays the dice element
           diceDOM.src = 'dice-' + dice + '.png'; // changes the dice image to match that of the actual roll
            
    
        // 3. If the rolled number is not 1, we update the round score.  Else, change player turn.
           if (dice !== 1) {
               roundScore = roundScore + dice; // add current to roundScore
               var currentDOM = document.querySelector('#current-' + playerTurn);  // again, store this to make it easier to reference
               currentDOM.textContent = roundScore; // change text content to match roundScore
           }
           else { // change player turn, set both current scores to 0 (using getID)
                changePlayerTurn();
           }
    
        }
     })
    
// hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    // if gameOn is true: if false, then that's it.
    if (gameOn) {
        // add roundScore to global score
        if (roundScore !== 0) { // if roundScore is 0, it's effectively a waste of turn
            scores[playerTurn] = scores[playerTurn] + roundScore;


            //update UI - playerScore
            document.querySelector('#score-' + playerTurn).textContent = scores[playerTurn];

            //check win condition. If true:
            if (scores[playerTurn] >= 100) {
                // the game is over, so gameOn should be false
                gameOn = false;
                // change winning player's name to reflect their victory by changing style
                document.querySelector('#name-' + playerTurn).innerHTML = '<b>' + 'WINNER!' + '</b>';
                // hide the dice
                document.querySelector('.dice').style.display = 'none';
            
                // add the winner CSS class
                document.querySelector('.player-' + playerTurn + '-panel').classList.add('winner');
                // remove the 'active' panel since the game has been won.
                document.querySelector('.player-' + playerTurn + '-panel').classList.remove('active');
            
            }
            else {
                //change playerTurn - since we've done this before (initially when rolling a 1), we can write a function to change turns
                // this avoids repetition and looks cleaner overall.
                changePlayerTurn();
            }


        }
    }
    })
    

// new game event listener
document.querySelector('.btn-new').addEventListener('click', newGame);

function changePlayerTurn() { // this function changes turn to the next player
    // change playerTurn variable from 0 to 1 or 1 to 0
    playerTurn === 0 ? playerTurn = 1 : playerTurn = 0;
    // reset roundScore
    roundScore = 0;
    // reset lastRoll
    lastRoll = 0;
    // reset current Scores to 0 using getID
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // toggle 'active' class using classList and toggle on both panels
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    // hide the dice
    document.querySelector('.dice').style.display = 'none';
}



// attempt at newGame function
function newGame() { // this will initialize a new game
    //set state variable saying the game is playing.
    gameOn = true;
    //change scores to 0 on back-end
    scores = [0,0];
    roundScore = 0;
    // change lastRoll to 0
    lastRoll = 0;
    // hide the dice
    document.querySelector('.dice').style.display = 'none';
    // set player names as 'Player 1' and 'Player 2'
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
   
    // reset playerTurn
    playerTurn = 0;
    // reset all scores to 0 in UI
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // remove the winner class from either player
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // remove active class on both players, then add it back to player 1 (prevents a panel having multiple active classes)
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
} 