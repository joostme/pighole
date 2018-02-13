import { Player } from "./player.model";
import { Field } from "./field.model";

export interface GameState {
    players: Player[];
    currentPlayer: number;
    fields: Field[],
    round: number,
    turns: number,
    winner: number | null
}

export type GameFn = (state: GameState) => GameState;
