const _ = require('lodash');

// TOOD: Get rid of underscore dependency
module.exports = class TicTacToe {
    constructor(players = ['X', 'O'], gridSize = 3) {
        this.gridSize = gridSize;
        this.players = players;
        this.resetGame();
    }
    
    /**
    * Initial game state
    */
    resetGame() {
        this.gameState = {
            board: _.times(this.gridSize, row => _.times(this.gridSize, col => undefined)), // Create 3 * 3 board
            turn: this.players[0], // default X player
            winner: undefined,
            moveCount: 0,
            isGameOver: false
        }
    }

    /**
    * Returns game state after player's move
    *
    * @param {string} player
    * @param {string[]} position
    */
    playerMove(player, position) {
        // TOOD: handle error cases
        // set player's move on board
        this.gameState.board[position[0]][position[1]] = player;
        this.gameState.moveCount++;
        this.gameState.winner = getWinner(this.players, this.gameState.board);
        this.gameState.turn = this.gameState.winner ? null : this.players[(this.players.indexOf(this.gameState.turn) + 1) % this.players.length];
        this.gameState.isGameOver = isGameOver(this.gameState.moveCount, this.gameState.winner, this.gameState.turn);
        
        return this.gameState;
    }

    /**
    * Resets game state for a fresh start
    */
    restartGame() {
        this.resetGame();
    }

    /**
    * Get game's most recent state
    */
    getGameState() {
        return this.gameState;
    }
}

/**
 * Returns true if the game has ended
 *
 * @param {number} moveCount number of moves made
 */
function isGameOver(moveCount, winner, turn) {
    return moveCount < 9 && (winner === undefined || turn !== null);
}

/**
 * Returns the winner
 *
 * @param {string[]} players players
 * @param {(string | undefined)[]} board board
 */
function getWinner(players, board) {
    const winner = players.find(player => isWinner(player, board));
    return winner !== undefined ? winner : (isBoardFull(board) ? null : undefined);
}

/**
 * Returns the winner based on horizontal, vertical, diagonal condition fullfilment
 *
 * @param {string} player player
 * @param {(string | undefined)[]} board board
 */
function isWinner(player, board) {
    return board.some(row => row.every(square => square === player)) ||
        _.range(board.length).some(col => board.every(row => row[col] === player)) ||
        board.every((row, index) => row[index] === player) ||
        board.every((row, index) => row[row.length - (index + 1)] === player);
}

/**
 * Returns a boolean if the board is full (undefined)
 *
 * @param {(string | undefined)[]} board board
 */
function isBoardFull(board) {
    return board.every(row => row.every(square => square !== undefined));
}
