import { GameState, GameFn } from "./models/game-state.model";
export declare function startGame(numberOfPlayers: number): GameState;
export declare function playTurn(): GameFn;
export declare function nextPlayer(): GameFn;
