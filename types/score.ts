import { Player } from './player';

// Surely not the best choice
export type Point = number;

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: 'POINTS';
  pointsData: PointsData;
};

export const points = (
  playerOnePoints: Point,
  playerTwoPoints: Point
): Points => ({
  kind: 'POINTS',
  pointsData: {
    PLAYER_ONE: playerOnePoints,
    PLAYER_TWO: playerTwoPoints,
  },
});

// Exerice 0: types et fonctions contructrices

export type Deuce = {
  kind: 'DEUCE';
};

export type Forty = {
  kind: 'FORTY';
  fortyData: {
    player: Player; 
    otherPoint: Point; 
  };
};

export type Advantage = {
  kind: 'ADVANTAGE';
  player: Player; 
};


export type Game = {
  kind: 'GAME';
  player: Player; 
};

export const deuce = (): Deuce => ({
  kind: 'DEUCE',
});

export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: {
    player,
    otherPoint,
  },
});

export const advantage = (player: Player): Advantage => ({
  kind: 'ADVANTAGE',
  player,
});


export const game = (winner: Player): Game => ({
  kind: 'GAME',
  player: winner,
});

//  inclure tous les états du jeu de tennis
export type Score = Points | Forty | Deuce | Advantage | Game;

console.log(deuce()); 
console.log(forty('PLAYER_ONE', 30));
console.log(advantage('PLAYER_TWO'));
console.log(game('PLAYER_ONE'));
