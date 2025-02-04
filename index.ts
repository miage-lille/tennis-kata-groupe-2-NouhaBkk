import { isSamePlayer, Player } from './types/player';
import { Point, PointsData, Score, forty, deuce, game, advantage, incrementPoint, FortyData, nextPoint, points } from './types/score';
import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';


// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player): Player => 
  player === 'PLAYER_ONE' ? 'PLAYER_TWO' : 'PLAYER_ONE';


// Exercice 1 :
export const pointToString = (point: Point): string =>{
  switch (point.kind) {
    case 'LOVE': return "Love";
    case 'FIFTEEN': return "15";
    case 'THIRTY': return "30";
    default: throw new Error("Invalid point");
  }
};

export const scoreToString = (score: Score): string =>{
  switch (score.kind) {
    case 'POINTS':
      return `PLAYER_ONE: ${pointToString(score.pointsData.playerOne)} - PLAYER_TWO: ${pointToString(score.pointsData.playerTwo)}`;
    case 'FORTY':
      return `Advantage ${score.fortyData.player}`;
    case 'DEUCE':
      return "Deuce";
    case 'ADVANTAGE':
      return `Advantage ${score.player}`;
    case 'GAME':
      return `Game won by ${score.player}`;
  }
}; 

export const scoreWhenDeuce = (winner: Player): Score => advantage(winner);

export const scoreWhenAdvantage = (
  advantagedPlayed: Player,
  winner: Player
): Score => {
  if (isSamePlayer(advantagedPlayed, winner)) return game(winner);
  return deuce();
};

export const scoreWhenForty = (
  currentForty: FortyData,
  winner: Player
): Score => {
  if (isSamePlayer(currentForty.player, winner)) return game(winner);
  return pipe(
    incrementPoint(currentForty.otherPoint),
    matchOpt(
      () => deuce(),
      p => forty(currentForty.player, p) as Score
    )
  );
};

export const scoreWhenGame = (winner: Player): Score => game(winner);

// Exercice 2
// Done



export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const currentPoint = winner === 'PLAYER_ONE' ? current.playerOne : current.playerTwo;

  // ✅ Si le joueur était à 30 et gagne, il passe à Forty
  if (currentPoint.kind === 'THIRTY') {
    return forty(winner, winner === 'PLAYER_ONE' ? current.playerTwo : current.playerOne);
  }

  // ✅ Sinon, on met à jour le score normalement avec `points()`
  return matchOpt<Point, Score>(
    () => points(current.playerOne, current.playerTwo), // Valeur par défaut (cas `none`)
    (newPoint) => points(
      winner === 'PLAYER_ONE' ? newPoint : current.playerOne,
      winner === 'PLAYER_TWO' ? newPoint : current.playerTwo
    )
  )(incrementPoint(currentPoint));
};






export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case 'POINTS':
      return scoreWhenPoint(currentScore.pointsData, winner);
    case 'FORTY':
      return scoreWhenForty(currentScore.fortyData, winner);
    case 'ADVANTAGE':
      return scoreWhenAdvantage(currentScore.player, winner);
    case 'DEUCE':
      return scoreWhenDeuce(winner);
    case 'GAME':
      return scoreWhenGame(winner);
  }
};
