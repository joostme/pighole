"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function getInitialState(numberOfPlayers) {
    return {
        players: generatePlayers(numberOfPlayers),
        fields: generateFields(),
        currentPlayer: 0,
        round: 1,
        turns: 1,
        winner: null,
        history: []
    };
}
exports.getInitialState = getInitialState;
function generatePlayers(numberOfPlayers) {
    return lodash_1.times(numberOfPlayers, function () { return ({
        pigs: 60 / numberOfPlayers
    }); });
}
function generateFields() {
    return lodash_1.times(5, function (index) { return ({
        amount: 0,
        max: index + 1
    }); });
}
