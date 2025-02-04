import { Player } from './types/player';
import { Point, PointsData, Score } from './types/score';
// import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
// import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};
// Exercice 1 :
export const pointToString = (point: Point): string =>{
  'You can use pattern matching with switch case pattern.'
  switch (point.kind) {
    case 'LOVE': return "Love";
    case 'FIFTEEN': return "15";
    case 'THIRTY': return "30";
    default: throw new Error("Invalid point");
  }
};

export const scoreToString = (score: Score): string =>{
  'You can use pattern matching with switch case pattern.';
  switch (score.kind) {
    case 'POINTS':
      return `PLAYER_ONE: ${pointToString(score.pointsData.playerOne)} - PLAYER_TWO: ${pointToString(score.pointsData.playerTwo)}`;
    case 'FORTY':
      return `PLAYER_ONE: ${score.fortyData.player === "PLAYER_ONE" ? "40" : pointToString(score.fortyData.otherPoint)} - PLAYER_TWO: ${score.fortyData.player === "PLAYER_TWO" ? "40" : pointToString(score.fortyData.otherPoint)}`;
    case 'DEUCE':
      return "Deuce";
    case 'ADVANTAGE':
      return `Advantage ${score.player}`;
    case 'GAME':
      return `Game won by ${score.player}`;
  }
};  
export const scoreWhenDeuce = (winner: Player): Score => {
  throw new Error('not implemented');
};

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  throw new Error('not implemented');
};

export const scoreWhenForty = (
  currentForty: unknown, // TO UPDATE WHEN WE KNOW HOW TO REPRESENT FORTY
  winner: Player
): Score => {
  throw new Error('not implemented');
};

export const scoreWhenGame = (winner: Player): Score => {
  throw new Error('not implemented');
};

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  throw new Error('not implemented');
};

export const score = (currentScore: Score, winner: Player): Score => {
  throw new Error('not implemented');
};
