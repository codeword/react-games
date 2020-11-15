import _ from 'lodash'
import {evaluateGuess, isWinner, createGame, CluePeg, ColorPeg} from './gameCalculations';
describe('createGame', () => {
  it('returns the correct code size', () => {
    let game = createGame(1,1);
    expect(game).toEqual({
      code: [ColorPeg[0]],
      colors: 1,
      slots: 1,
      allowDupes: false
    });
    expect(createGame(9, 2).code).toHaveLength(2);
    expect(createGame(9,9).code).toHaveLength(9);
  });

  it('does not duplicate values by default', () => {
    let game1 = createGame(4,4);
    expect(_.uniq(game1.code)).toEqual(game1.code);
    expect(game1.allowDupes).toBe(false);

    let game2 = createGame(6,4);
    expect(_.uniq(game2.code)).toEqual(game2.code);
    expect(game2.allowDupes).toBe(false);
  });
  it('will duplicate values if length > valueCount', () => {
    let game1 = createGame(4,6);
    expect(_.uniq(game1.code).length).toBeLessThanOrEqual(4);
    expect(game1.allowDupes).toBe(true);
  });
  it('will duplicate values if allowDupes is set', () => {
    let game1 = createGame(9,9,true);
    expect(game1.allowDupes).toBe(true);
  });
});
describe('isWinner', () => {
  it('is true if all pegs are in the right position', () => {
    expect(isWinner([1,2,3,4], [1,1,1,1])).toBe(true);
    expect(isWinner([2,3,4], [1,1,1])).toBe(true);
  });
  it('is true if all pegs are in the right position', () => {
    expect(isWinner([1,2,3,4], [0,1,1,1])).toBe(false);
    expect(isWinner([1,2,3,4], [1,1,1])).toBe(false);
  });
});
describe('evaluateGuess', () => {
  it('shows matching pegs', () => {
    expect(evaluateGuess(
      [1,2,3,4],
      [1,2,3,4]
    )).toEqual(
      [1,1,1,1]
    );
  });
  it('only shows matching pegs', () => {
    expect(evaluateGuess(
      [5,6,3,4],
      [1,2,3,4]
    )).toEqual(
      [1,1,2,2]
    );
  });
  it('shows wrong spot', () => {
    expect(evaluateGuess(
      [5,6,3,4],
      [1,2,4,3]
    )).toEqual(
      [0,0,2,2]
    );
  });
  it('orders results', () => {
    expect(evaluateGuess(
      [1,2,3,4],
      [3,2,1,4]
    )).toEqual(
      [0,0,1,1]
    );
  });

  describe('duplicates in code', () => {
    it('only shows once in clue', () => {
      expect(evaluateGuess(
        [1,1,3,4],
        [1,3,2,4]
      ).map(clue => CluePeg[clue])).toEqual(
        [0,1,1,2].map(clue => CluePeg[clue])
      );
    });
  });

  describe('duplicates in guess', () => {
    it('only shows once in clue', () => {
      expect(evaluateGuess(
        [1,2,3,4],
        [1,1,2,4]
      )).toEqual(
        [0,1,1,2]
      );
    });    

    expect(evaluateGuess(
      [1,2,3,4],
      [1,3,3,4]
    )).toEqual(
      [1,1,1,2]
    );
  });
});