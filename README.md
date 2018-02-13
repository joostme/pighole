# Pighole Game Library

This is a simple functional game library for the game "Pighole Big Hole" for 2-6 players.

## How To Play

- 60 pigs are equally distributed to the players
- The first player with 0 pigs wins the game
- In round 1 every player rolls the dice exactly once
    - In round 2 every players roll the dice exactly twice
    - In round 3 every player can roll as often as he likes to until he decides it's the next players turn or he has to take pigs
- Rolling 1-5 the player has to place one of his pigs on the respective field (1-5)
    - Rolling a 6 the player can remove on of his pigs without putting it on a field
- Every field can hold a specific amount of pigs: Field 1 has a maximum of 1, field 2 a maximum of 2 etc. until 5. There is no field for 6
- If a player rolls a field that is already full, he has to take all the pigs on that field and it's the next players turn

## How to use this library

### Start a new game
```ts
startGame(numberOfPlayers: number): GameState
```

This will return a new initial game state with the number of players defined

### Play a turn

```ts
playTurn(state: GameState): GameState
```

### Set next player
After the third round every player can roll as often as he likes to. But he also has the option to not roll.

```ts
nextPlayer(state: GameState): GameState
```

## Game State
The game state looks as follows
```ts
export interface GameState {
    players: Player[];
    currentPlayer: number;
    fields: Field[],
    round: number,
    turns: number,
    winner: number | null,
    history: Turn[]
}

export interface Player {
    pigs: number
}

export interface Field {
    amount: number;
    max: number;
}

export interface Turn {
    player: number;
    rolled: number;
    pigs: number;
}
```

### Winner
If a winner is found the `winner` property of the game state is set to the players index that won
