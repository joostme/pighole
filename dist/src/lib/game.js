"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function checkPlayers(numberOfPlayers) {
    if (numberOfPlayers < 2 || numberOfPlayers > 6) {
        throw new Error('Only 2-6 players allowed');
    }
}
exports.checkPlayers = checkPlayers;
function checkFieldsAndDistributePigs(dice) {
    return function (state) {
        if (dice === 6) {
            return lodash_1.flow(addTurnToHistory(dice, -1), changePigsOfCurrentPlayer(-1))(state);
        }
        return checkFieldAndChangePigs(dice)(state);
    };
}
exports.checkFieldsAndDistributePigs = checkFieldsAndDistributePigs;
function subtractTurn() {
    return function (state) {
        if (state.turns > 1) {
            return __assign({}, state, { turns: state.turns - 1 });
        }
        return setNextPlayer()(state);
    };
}
exports.subtractTurn = subtractTurn;
function setWinner() {
    return function (state) {
        if (state.players[state.currentPlayer].pigs === 0) {
            return __assign({}, state, { winner: state.currentPlayer });
        }
        return state;
    };
}
exports.setWinner = setWinner;
function changePigsOfCurrentPlayer(pigs) {
    return function (state) {
        var newState = __assign({}, state);
        newState.players[newState.currentPlayer].pigs += pigs;
        return newState;
    };
}
function checkFieldAndChangePigs(dice) {
    return function (state) {
        var newState = __assign({}, state);
        var checkedField = newState.fields[dice - 1];
        if (checkedField.amount === checkedField.max) {
            checkedField.amount = 0;
            return lodash_1.flow(addTurnToHistory(dice, +checkedField.max), changePigsOfCurrentPlayer(+checkedField.max), setNextPlayer())(newState);
        }
        checkedField.amount += 1;
        return lodash_1.flow(addTurnToHistory(dice, -1), changePigsOfCurrentPlayer(-1))(newState);
    };
}
function setNextPlayer() {
    return function (state) {
        var maxPlayers = state.players.length - 1;
        if (state.currentPlayer === maxPlayers) {
            return __assign({}, lodash_1.flow(setNextRound(), setTurns())(state), { currentPlayer: 0 });
        }
        return __assign({}, setTurns()(state), { currentPlayer: state.currentPlayer + 1 });
    };
}
exports.setNextPlayer = setNextPlayer;
function setNextRound() {
    return function (state) { return (__assign({}, state, { round: state.round + 1 })); };
}
function setTurns() {
    return function (state) {
        if (state.round >= 3) {
            return __assign({}, state, { turns: Infinity });
        }
        return __assign({}, state, { turns: state.round });
    };
}
function addTurnToHistory(dice, pigs) {
    return function (state) {
        return __assign({}, state, { history: state.history.concat([
                {
                    pigs: pigs,
                    rolled: dice,
                    player: state.currentPlayer
                }
            ]) });
    };
}
