import { GameState, GameFn } from "./models/game-state.model";
import { getInitialState } from "./lib/state";
import { checkPlayers, checkFieldsAndDistributePigs, subtractTurn, setNextPlayer, setWinner } from "./lib/game";
import { rollDice } from "./lib/util";

export function startGame(numberOfPlayers: number): GameState {
    checkPlayers(numberOfPlayers);
    return getInitialState(numberOfPlayers);
}

export function playTurn(): GameFn {
    return (state: GameState) => {
        const dice = rollDice();
        console.log('Rolled ' + dice);
        let newState = checkFieldsAndDistributePigs(dice)(state);
        newState = setWinner()(newState);
        newState = subtractTurn()(newState);
        return newState;
    }
}

export function nextPlayer(): GameFn {
    return (state: GameState) => {
        return setNextPlayer()(state);
    }
}
