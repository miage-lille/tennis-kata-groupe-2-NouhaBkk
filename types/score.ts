import { Player } from './player';
import { none, some, Option } from 'fp-ts/Option';

// Définition des points (Love, 15, 30)
export type Love = { kind: 'LOVE' };
export type Fifteen = { kind: 'FIFTEEN' };
export type Thirty = { kind: 'THIRTY' };
export type Point = Love | Fifteen | Thirty;

//  Fonctions constructrices pour les points
export const love = (): Love => ({ kind: 'LOVE' });
export const fifteen = (): Fifteen => ({ kind: 'FIFTEEN' });
export const thirty = (): Thirty => ({ kind: 'THIRTY' });

//  Définition des scores
export type PointsData = { playerOne: Point; playerTwo: Point };
export type FortyData = { player: Player; otherPoint: Point };

export type Points = { kind: 'POINTS'; pointsData: PointsData };
export type Forty = { kind: 'FORTY'; fortyData: FortyData };
export type Deuce = { kind: 'DEUCE' };
export type Advantage = { kind: 'ADVANTAGE'; player: Player };
export type Game = { kind: 'GAME'; player: Player };

export type Score = Points | Forty | Deuce | Advantage | Game;

// Exercice 0: Fonctions constructrices pour les états
export const points = (playerOnePoints: Point, playerTwoPoints: Point): Points => ({
  kind: 'POINTS',
  pointsData: {
  playerOne: playerOnePoints,
  playerTwo: playerTwoPoints,
  },
 });
 export const forty = (player: Player, otherPoint: Point): Forty => ({
  kind: 'FORTY',
  fortyData: { player, otherPoint },
});export const deuce = (): Deuce => ({ kind: 'DEUCE' });
export const advantage = (player: Player): Advantage => ({ kind: 'ADVANTAGE', player });
export const game = (winner: Player): Game => ({ kind: 'GAME', player: winner });

//Exercice 1
export const incrementPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none; 
  }
};

export const nextPoint = (point: Point): Option<Point> => {
  switch (point.kind) {
    case 'LOVE':
      return some(fifteen());
    case 'FIFTEEN':
      return some(thirty());
    case 'THIRTY':
      return none; 
  }
};