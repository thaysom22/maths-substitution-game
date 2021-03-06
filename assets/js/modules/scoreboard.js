export { Scoreboard };
import { GameoverModal } from "./modals.js";

class Scoreboard {
    constructor(player1Name, player2Name, difficultySetting){
        this.player1Board = {
            playerName: player1Name,
            playerScore: 0,
            playerTurns: 5, // turns remaining
            active: true // player1 starts
        };
        this.player2Board = {
            playerName: player2Name,
            playerScore: 0,
            playerTurns: 5, // when player2Board.playerTurns === 0, game ends
            active: false
        };
        this.difficultySetting = difficultySetting;

        initializeScoreboardDOM(this.player1Board, this.player2Board); // initialize player data on scoreboard in DOM

        function initializeScoreboardDOM(player1, player2) {
            $('#player1-scoreboard .scoreboard-title').text(player1.playerName);
            $('#player2-scoreboard .scoreboard-title').text(player2.playerName);
            $('#player1-scoreboard .main-score>.value').text(player1.playerScore);
            $('#player2-scoreboard .main-score>.value').text(player2.playerScore);
            $('#player1-scoreboard .score-turns>.value').text(player1.playerTurns);
            $('#player2-scoreboard .score-turns>.value').text(player2.playerTurns);
            return;
        }   
    }

    /**
     * takes score for player turn as argument, updates playerScore and playerTurns data stored on instance, updates scoreboard content in DOM
     * invokes endGameModal if players are out of turns (checks each turn)
     * @param {*Number} playerTurnScore
     */
    endPlayerTurn(playerTurnScore) {
        updateScoreboardData.bind(this)(playerTurnScore);
        updateScoreboardDOM.bind(this)();
        endGameCheck.bind(this)();
        
        // update player1Board and player2Board objects
        function updateScoreboardData(playerTurnScore) {
            if (this.player1Board.active === true) { // if turn belongs to player1...
                this.player1Board.playerScore += playerTurnScore;
                this.player1Board.playerTurns -= 1;
                this.player1Board.active = false;
                this.player2Board.active = true;
            } else { // if turn belongs to player2...
                this.player2Board.playerScore += playerTurnScore;
                this.player2Board.playerTurns -= 1;
                this.player2Board.active = false;
                this.player1Board.active = true;
            }
            return;
        }
        
        // update scoreboard in DOM
        function updateScoreboardDOM() {    
            $('#player1-scoreboard .main-score>.value').text(this.player1Board.playerScore);
            $('#player2-scoreboard .main-score>.value').text(this.player2Board.playerScore);
            $('#player1-scoreboard .score-turns>.value').text(this.player1Board.playerTurns);
            $('#player2-scoreboard .score-turns>.value').text(this.player2Board.playerTurns);
            return;
        }

        // check at end of every turn: when player2 runs out of turns instatiate GameOverModal as global object to end game
        function endGameCheck(){
            if (this.player2Board.playerTurns === 0) { 
                window.gameoverModal = new GameoverModal(this.player1Board.playerName, this.player1Board.playerScore, this.player2Board.playerName, this.player2Board.playerScore, this.difficultySetting);
            }
            return;
        }
    }
}