import { GameFn } from "../models/game-state.model";
export declare function checkPlayers(numberOfPlayers: number): void;
export declare function checkFieldsAndDistributePigs(dice: number): GameFn;
export declare function subtractTurn(): GameFn;
export declare function setWinner(): GameFn;
export declare function setNextPlayer(): GameFn;
