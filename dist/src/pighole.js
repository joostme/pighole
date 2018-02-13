"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./lib/state");
var game_1 = require("./lib/game");
var util_1 = require("./lib/util");
var lodash_1 = require("lodash");
function startGame(numberOfPlayers) {
    game_1.checkPlayers(numberOfPlayers);
    return state_1.getInitialState(numberOfPlayers);
}
exports.startGame = startGame;
function playTurn() {
    return function (state) {
        var dice = util_1.rollDice();
        return lodash_1.flow(game_1.checkFieldsAndDistributePigs(dice), game_1.setWinner(), game_1.subtractTurn())(state);
    };
}
exports.playTurn = playTurn;
function nextPlayer() {
    return function (state) {
        return game_1.setNextPlayer()(state);
    };
}
exports.nextPlayer = nextPlayer;
