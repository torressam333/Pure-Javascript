/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
 var scores, roundScore, activePlayer, gamePlaying;
 
 init();


// document.querySelector('#current-' + activePlayer).textContent = dice;

 //var x = document.querySelector('score-0').textContent;




document.querySelector(".btn-roll").addEventListener('click', function (){
	if(gamePlaying){
	//1. Random number Generator
	var dice = Math.floor(Math.random() * 6 + 1);

	//2. Display the result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';

	//3. Update the round score IF the rolled # != 1
	if(dice !== 1){
		//add score
		roundScore += dice
		document.querySelector('#current-' + activePlayer).textContent = roundScore;
	}else{
		//Next players turn
		//Next Player
		nextPlayer();
	}

}//END IF

});

document.querySelector('.btn-hold').addEventListener('click', function(){

if(gamePlaying){
//1.Add current score to the Globall score

scores[activePlayer] += roundScore;


//2.Update UI
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];


//3.Check if player won the game

     // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.dislay = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            
            //Where to detect if a player wins the game thats why gamePlaying is false here
            gamePlaying = false;
        } else{
        	nextPlayer();
        }

    }//end if

});

document.querySelector(".btn-new").addEventListener("click", init);


function init(){

	//1.Reset Scores back to zero
	scores = [0,0]
	//2. Set active player back to player 1
	activePlayer = 0;
	//3.Set roundscore back to zero
	roundScore = 0;
	//4.GAMEPLAYING is true here b/c the game is being played
	gamePlaying = true;


document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
//re-adds the active class the first player after all active classes are removed
document.querySelector('.player-0-panel').classList.add('active');



}

function nextPlayer(){

	//Next players turn
		//This is the ternary operator/Similar to an IF statement
		activePlayer===0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';

		//Changes who's turn it is asthetically with the active class.
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		//Hide the dice when the turn changes players
		document.querySelector('.dice').style.display = 'none';
	}
