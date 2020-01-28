const TicTacToe = require('../public/TicTacToe');
const assert = require('chai').assert;
const expect = require('chai').expect;

let ticTacToae;

describe("TicTacToe", function () {
	beforeEach(() => (ticTacToae = new TicTacToe()));

	describe("Game states while game is on-going", () => {
		it("should start with player X", () => {
			assert.doesNotThrow(() => ticTacToae.playerMove("X", [0, 0]));
		});
		it("should track the players turn", () => {
			let gameState = ticTacToae.playerMove("", [0, 0]);
			expect(gameState.turn).to.equal("O"); 
			gameState = ticTacToae.playerMove("O", [1, 0]);
			expect(gameState.turn).to.equal("X"); 
		});
		it("should have winner as undefined when ticTacToae is in progress", () => {
			let gameState = ticTacToae.playerMove("X", [0, 0]);
			expect(gameState.winner).to.equal(undefined);
			gameState = ticTacToae.playerMove("O", [1, 0]);
			expect(gameState.winner).to.equal(undefined);
		});
	});

	describe("ticTacToae post game states", () => {
		it("should win by vertical line", () => {
			ticTacToae.playerMove("X", [0, 0]);
			ticTacToae.playerMove("O", [0, 1]);
			ticTacToae.playerMove("X", [0, 2]);
			ticTacToae.playerMove("O", [1, 1]);
			ticTacToae.playerMove("X", [1, 2]);
			let gameState = ticTacToae.playerMove("O", [2, 1]);
			expect(gameState.winner).to.equal("O");
		});
		it("should win by horizontal line", () => {
			ticTacToae.playerMove("X", [0, 0]);
			ticTacToae.playerMove("O", [2, 0]);
			ticTacToae.playerMove("X", [0, 2]);
			ticTacToae.playerMove("O", [2, 2]);
			ticTacToae.playerMove("X", [1, 2]);
			let gameState = ticTacToae.playerMove("O", [2, 1]);
			expect(gameState.winner).to.equal("O");
		});
		it("should win by descending diagonal line", () => {
			ticTacToae.playerMove("X", [0, 0]);
			ticTacToae.playerMove("O", [0, 1]);
			ticTacToae.playerMove("X", [1, 1]);
			ticTacToae.playerMove("O", [2, 1]);
			let gameState = ticTacToae.playerMove("X", [2, 2]);
			expect(gameState.winner).to.equal("X");
		});
		it("should win by ascending diagonal line", () => {
			ticTacToae.playerMove("X", [2, 0]);
			ticTacToae.playerMove("O", [0, 1]);
			ticTacToae.playerMove("X", [1, 1]);
			ticTacToae.playerMove("O", [2, 1]);
			let gameState = ticTacToae.playerMove("X", [0, 2]);
			expect(gameState.winner).to.equal("X");
		});
		it("should win if the last move fills the board entirely", () => {
			ticTacToae.playerMove("X", [0, 0]);
			ticTacToae.playerMove("O", [0, 1]);
			ticTacToae.playerMove("X", [0, 2]);
			ticTacToae.playerMove("O", [1, 0]);
			ticTacToae.playerMove("X", [1, 1]);
			ticTacToae.playerMove("O", [1, 2]);
			ticTacToae.playerMove("X", [2, 1]);
			ticTacToae.playerMove("O", [2, 0]);
			let gameState = ticTacToae.playerMove("X", [2, 2]);
			expect(gameState.winner).to.equal("X");
		});
		it("should result in a draw match", () => {
			ticTacToae.playerMove("X", [0, 0]);
			ticTacToae.playerMove("O", [0, 1]);
			ticTacToae.playerMove("X", [0, 2]);
			ticTacToae.playerMove("O", [1, 0]);
			ticTacToae.playerMove("X", [1, 1]);
			ticTacToae.playerMove("O", [2, 2]);
			ticTacToae.playerMove("X", [2, 1]);
			ticTacToae.playerMove("O", [2, 0]);
			let gameState = ticTacToae.playerMove("X", [1, 2]);
			expect(gameState.winner).to.equal(null);
		});
	});
});
