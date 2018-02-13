import { Player } from "./player.model";
import { Field } from "./field.model";
import { Turn } from "./turn.model";

export interface GameState {
    players: Player[];
    currentPlayer: number;
    fields: Field[],
    round: number,
    turns: number,
    winner: number | null,
    history: Turn[]
}

export type GameFn = (state: GameState) => GameState;
