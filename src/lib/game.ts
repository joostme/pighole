import { GameState, GameFn } from "../models/game-state.model";
import { flow } from "lodash";

export function checkPlayers(numberOfPlayers: number) {
    if (numberOfPlayers < 2 || numberOfPlayers > 6) {
        throw new Error('Only 2-6 players allowed');
    }
}

export function checkFieldsAndDistributePigs(dice: number): GameFn {
    return (state: GameState) => {

        if (dice === 6) {
            return flow(
                addTurnToHistory(dice, -1),
                changePigsOfCurrentPlayer(-1)
            )(state)
        }

        return checkFieldAndChangePigs(dice)(state);
    };
}

export function subtractTurn(): GameFn {
    return (state: GameState) => {

        if (state.turns > 1) {
            return {
                ...state,
                turns: state.turns - 1
            }
        }

        return setNextPlayer()(state);
    };
}

export function setWinner(): GameFn {
    return (state: GameState) => {

        if (state.players[state.currentPlayer].pigs === 0) {
            return {
                ...state,
                winner: state.currentPlayer
            }
        }

        return state;
    }
}

function changePigsOfCurrentPlayer(pigs: number): GameFn {
    return (state: GameState) => {
        const newState = {
            ...state
        };
        newState.players[newState.currentPlayer].pigs += pigs;
        return newState;
    }
}

function checkFieldAndChangePigs(dice: number): GameFn {
    return (state: GameState) => {
        let newState = {
            ...state
        };

        const checkedField = newState.fields[dice - 1];

        if (checkedField.amount === checkedField.max) {
            checkedField.amount = 0;
            return flow(
                addTurnToHistory(dice, +checkedField.max),
                changePigsOfCurrentPlayer(+checkedField.max),
                setNextPlayer()
            )(newState)
        }

        checkedField.amount += 1;

        return flow(
            addTurnToHistory(dice, -1),
            changePigsOfCurrentPlayer(-1)
        )(newState)
    }
}

export function setNextPlayer(): GameFn {
    return (state: GameState) => {
        const maxPlayers = state.players.length - 1;

        if (state.currentPlayer === maxPlayers) {
            return {
                ...flow(
                    setNextRound(),
                    setTurns()
                )(state),
                currentPlayer: 0
            }
        }

        return {
            ...setTurns()(state),
            currentPlayer: state.currentPlayer + 1
        }
    };
}

function setNextRound(): GameFn {
    return (state: GameState) => ({
        ...state,
        round: state.round + 1
    })
}

function setTurns(): GameFn {
    return (state: GameState) => {

        if (state.round >= 3) {
            return {
                ...state,
                turns: Infinity
            }
        }

        return {
            ...state,
            turns: state.round
        }
    }
}

function addTurnToHistory(dice: number, pigs: number): GameFn {
    return (state: GameState) => {
        return {
            ...state,
            history: [
                ...state.history,
                {
                    pigs,
                    rolled: dice,
                    player: state.currentPlayer
                }
            ]
        }
    }
}
