import { GameState, GameFn } from "./models/game-state.model";
import { getInitialState } from "./lib/state";
import { checkPlayers, checkFieldsAndDistributePigs, subtractTurn, setNextPlayer, setWinner } from "./lib/game";
import { rollDice } from "./lib/util";
import { flow } from "lodash";

export function startGame(numberOfPlayers: number): GameState {
    checkPlayers(numberOfPlayers);
    return getInitialState(numberOfPlayers);
}

export function playTurn(): GameFn {
    return (state: GameState) => {
        const dice = rollDice();
        return flow(
            checkFieldsAndDistributePigs(dice),
            setWinner(),
            subtractTurn()
        )(state);
    }
}

export function nextPlayer(): GameFn {
    return (state: GameState) => {
        return setNextPlayer()(state);
    }
}
