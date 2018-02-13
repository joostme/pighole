import { GameState, GameFn } from "../models/game-state.model";

export function checkPlayers(numberOfPlayers: number) {
    if (numberOfPlayers < 2 || numberOfPlayers > 6) {
        throw new Error('Only 2-6 players allowed');
    }
}

export function checkFieldsAndDistributePigs(dice: number): GameFn {
    return (state: GameState) => {
        let newState = {
            ...state
        };
        if (dice === 6) {
            newState = addTurnToHistory(dice, -1)(newState);
            return changePigsOfCurrentPlayer(-1)(newState);
        } else {
            const field = dice - 1;
            newState = addTurnToHistory(dice, field)(newState);
            return checkFieldAndChangePigs(field)(newState);
        }
    };
}

export function subtractTurn(): GameFn {
    return (state: GameState) => {
        if (state.turns > 1) {
            return {
                ...state,
                turns: state.turns - 1
            }
        } else {
            return setNextPlayer()(state);
        }
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

function checkFieldAndChangePigs(field: number): GameFn {
    return (state: GameState) => {
        const newState = {
            ...state
        };
        const checkedField = newState.fields[field];
        if (checkedField.amount === checkedField.max) {
            checkedField.amount = 0;
            return changePigsOfCurrentPlayer(+checkedField.max)(newState);
        } else {
            checkedField.amount += 1;
            return changePigsOfCurrentPlayer(-1)(newState);
        }
    }
}

export function setNextPlayer(): GameFn {
    return (state: GameState) => {
        let newState = {
            ...state
        };
        const maxPlayers = newState.players.length - 1;
        if (newState.currentPlayer === maxPlayers) {
            newState = setNextRound()(newState);
            newState = setTurns()(newState);
            newState.currentPlayer = 0;
        } else {
            newState = setTurns()(newState);
            newState.currentPlayer += 1;
        }
        return newState;
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
        } else {
            return {
                ...state,
                turns: state.round
            }
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
