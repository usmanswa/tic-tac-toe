const express = require("express");
const app = express();
const TicTacToe = require("./public/TicTacToe");
const ticTacToe = new TicTacToe();

app.use(express.json());

app.get("/restartGame", (req, res) => {
  ticTacToe.restartGame();
  res.send(200);
});

app.post("/playerMove", (req, res) => {
  if (req.body.player && req.body.position) {
    var gameState = ticTacToe.playerMove(req.body.player, req.body.position);
    if (gameState) {
      res.status(201).send(gameState);
    } else {
      res.status(500).send({ error: "Request failed!" });
    }
  } else {
    res.status(400).send({ error: "Bad request!" });
  }
});

app.listen(3000);
