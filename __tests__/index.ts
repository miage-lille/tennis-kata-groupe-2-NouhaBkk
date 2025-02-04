import { describe, expect, test } from '@jest/globals';
import { otherPlayer, playerToString } from '..';
import { deuce, advantage, game, forty, points, thirty } from '../types/score';
import { pointToString, scoreToString, scoreWhenAdvantage, scoreWhenDeuce, scoreWhenForty, scoreWhenGame, scoreWhenPoint } from '../index';
import { isSamePlayer, Player } from '../types/player';
import * as fc from 'fast-check';
import * as G from './generators';


describe('Constructors for Deuce, Forty, and Advantage', () => {
  test('deuce() should return a valid Deuce object', () => {
    expect(deuce()).toStrictEqual({ kind: 'DEUCE' });
  });

  test('forty() should return a valid Forty object with given player and otherPoint', () => {
    expect(forty('PLAYER_ONE', { kind: 'THIRTY' })).toStrictEqual({
      kind: 'FORTY',
      fortyData: {
        player: 'PLAYER_ONE',
        otherPoint: { kind: 'THIRTY' }
      }
    });
  });

  test('advantage() should return a valid Advantage object', () => {
    expect(advantage('PLAYER_TWO')).toStrictEqual({ kind: 'ADVANTAGE', player: 'PLAYER_TWO' });
  });
});



describe('Conversion functions', () => {
  test('pointToString should return correct string for each point', () => {
    expect(pointToString({ kind: 'LOVE' })).toStrictEqual("Love");
    expect(pointToString({ kind: 'FIFTEEN' })).toStrictEqual("15");
    expect(pointToString({ kind: 'THIRTY' })).toStrictEqual("30");
  });

  test('scoreToString should return correct string representation', () => {
    expect(scoreToString(deuce())).toStrictEqual("Deuce");
    expect(scoreToString(advantage("PLAYER_ONE"))).toStrictEqual("Advantage PLAYER_ONE");
    expect(scoreToString(game("PLAYER_TWO"))).toStrictEqual("Game won by PLAYER_TWO");
    expect(scoreToString(points({ kind: 'FIFTEEN' }, { kind: 'THIRTY' })))
      .toStrictEqual("PLAYER_ONE: 15 - PLAYER_TWO: 30");
  });
});




describe('Tests for tooling functions', () => {
  test('Given playerOne when playerToString', () => {
    expect(playerToString('PLAYER_ONE')).toStrictEqual('Player 1');
  });

  test('Given playerOne when otherPlayer', () => {
    expect(otherPlayer('PLAYER_ONE')).toStrictEqual('PLAYER_TWO');
  });
});

describe('Tests for transition functions', () => {
  test('Given deuce, score is advantage to winner', () => {
    fc.assert(
      fc.property(G.getPlayer(), winner => {
        const score = scoreWhenDeuce(winner);
        const scoreExpected = advantage(winner);
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
    fc.assert(
      fc.property(G.getPlayer(), G.getPlayer(), (advantagedPlayer, winner) => {
        const score = scoreWhenAdvantage(advantagedPlayer, winner);
        const scoreExpected = game(winner);
        fc.pre(isSamePlayer(advantagedPlayer, winner));
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given advantage when otherPlayer wins, score is Deuce', () => {
    fc.assert(
      fc.property(G.getPlayer(), G.getPlayer(), (advantagedPlayer, winner) => {
        fc.pre(!isSamePlayer(advantagedPlayer, winner));
        const score = scoreWhenAdvantage(advantagedPlayer, winner);
        const scoreExpected = deuce();
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given a player at 40 when the same player wins, score is Game for this player', () => {
    fc.assert(
      fc.property(G.getForty(), G.getPlayer(), ({ fortyData }, winner) => {
        // Player who have forty points wins
        fc.pre(isSamePlayer(fortyData.player, winner));
        const score = scoreWhenForty(fortyData, winner);
        const scoreExpected = game(winner);
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
    fc.assert(
      fc.property(G.getForty(), G.getPlayer(), ({ fortyData }, winner) => {
        // Other player wins
        fc.pre(!isSamePlayer(fortyData.player, winner));
        // Other point must be 30
        fc.pre(fortyData.otherPoint.kind === 'THIRTY');
        const score = scoreWhenForty(fortyData, winner);
        const scoreExpected = deuce();
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  test('Given player at 40 and other at 15 when other wins, score is 40 - 30', () => {
    fc.assert(
      fc.property(G.getForty(), G.getPlayer(), ({ fortyData }, winner) => {
        // Other player wins
        fc.pre(!isSamePlayer(fortyData.player, winner));
        // Other point must be 30
        fc.pre(fortyData.otherPoint.kind === 'FIFTEEN');
        const score = scoreWhenForty(fortyData, winner);
        const scoreExpected = forty(fortyData.player, thirty());
        expect(score).toStrictEqual(scoreExpected);
      })
    );
  });
  //-------------------------TESTS POINTS-------------------------- //
  test('Given players at 0 or 15 points, score kind is still POINTS', () => {
    fc.assert(
      fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
        fc.pre(pointsData.playerOne.kind !== 'THIRTY' && pointsData.playerTwo.kind !== 'THIRTY');
        const newScore = scoreWhenPoint(pointsData, winner);
        expect(newScore.kind).toStrictEqual('POINTS');
      })
    );
  });
  test('Given one player at 30 and win, score kind is forty', () => {
    fc.assert(
      fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
        fc.pre(pointsData.playerOne.kind === 'THIRTY' || pointsData.playerTwo.kind === 'THIRTY');
        const newScore = scoreWhenPoint(pointsData, winner);
        expect(newScore.kind).toStrictEqual('FORTY');
    })
  );
  });
});
