import { GameState } from "../models/game-state.model";
import { Player } from "../models/player.model";
import { times } from 'lodash';
import { Field } from "../models/field.model";

export function getInitialState(numberOfPlayers: number): GameState {
    return {
        players: generatePlayers(numberOfPlayers),
        fields: generateFields(),
        currentPlayer: 0,
        round: 1,
        turns: 1,
        winner: null
    }
}

function generatePlayers(numberOfPlayers: number): Player[] {
    return times(numberOfPlayers, (): Player => ({
        pigs: 60 / numberOfPlayers
    }));
}

function generateFields(): Field[] {
    return times(5, (index): Field =>({
        amount: 0,
        max: index + 1
    }));
}
