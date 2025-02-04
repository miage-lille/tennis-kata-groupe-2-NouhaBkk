import { describe, expect, test } from '@jest/globals';
import { otherPlayer, playerToString } from '..';
import { deuce, advantage, game, forty, points } from '../types/score';

// import * as fc from 'fast-check';

// import * as G from './generators';


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
    console.log('To fill when we will know how represent Deuce');
  });
  test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
    console.log('To fill when we will know how represent Advantage');
  });
  test('Given advantage when otherPlayer wins, score is Deuce', () => {
    console.log('To fill when we will know how represent Advantage');
  });
  test('Given a player at 40 when the same player wins, score is Game for this player', () => {
    console.log('To fill when we will know how represent Forty');
  });
  test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
    console.log('To fill when we will know how represent Forty');
  });
  test('Given player at 40 and other at 15 when other wins, score is 40 - 15', () => {
    console.log('To fill when we will know how represent Forty');
  });
  //-------------------------TESTS POINTS-------------------------- //
  // test('Given players at 0 or 15 points score kind is still POINTS', () => {
  // fc.assert(
  //   fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
  //     throw new Error(
  //       'Your turn to code the preconditions, expected result and test.'
  //     );
  //   })
  // );
  // });
  // test('Given one player at 30 and win, score kind is forty', () => {
  // fc.assert(
  //   fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
  //     throw new Error(
  //       'Your turn to code the preconditions, expected result and test.'
  //     );
  //   })
  // );
  // });
});
