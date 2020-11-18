import _ from 'lodash'
import {evaluateGuess, isWinner, createGame, CluePeg, ColorPeg, FillPeg, PlayableColor, CodeColor, AnyColor, ClueColor} from './gameCalculations';

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
    expect(isWinner(
      ['c1','c2','c3','c4'], 
      ['rightSpot','rightSpot','rightSpot','rightSpot']
    )).toBe(true);
    expect(isWinner(
      ['c2','c3','c4'], 
      ['rightSpot','rightSpot','rightSpot']
    )).toBe(true);
  });
  it('is true if all pegs are in the right position', () => {
    expect(isWinner(
      ['c1','c2','c3','c4'], 
      ['wrongSpot','rightSpot','rightSpot','rightSpot']
    )).toBe(false);
    expect(isWinner(
      ['c1','c2','c3','c4'], 
      ['rightSpot','rightSpot','rightSpot']
    )).toBe(false);
  });
});
describe('evaluateGuess', () => {
  it('shows matching pegs', () => {
    expect(evaluateGuess(
      ['c1','c2','c3','c4'],
      ['c1','c2','c3','c4']
    )).toEqual(
      ['rightSpot','rightSpot','rightSpot','rightSpot']
    );
  });
  it('only shows matching pegs', () => {
    expect(evaluateGuess(
      ['c5','c6','c3','c4'],
      ['c1','c2','c3','c4']
    )).toEqual(
      ['rightSpot','rightSpot','wrongColor','wrongColor']
    );
  });
  it('shows wrong spot', () => {
    let x = evaluateGuess(
      ['c5','c6','c3','c4'],
      ['c1','c2','c4','c3']
    );
    expect(x).toEqual(
      ['wrongSpot','wrongSpot','wrongColor','wrongColor']
    );
  });
  it('orders results', () => {
    expect(evaluateGuess(
      ['c1','c2','c3','c4'],
      ['c3','c2','c1','c4']
    )).toEqual(
      ['wrongSpot','wrongSpot','rightSpot','rightSpot']
    );
  });

  describe('duplicates in code', () => {
    it('only shows once in clue', () => {
      expect(evaluateGuess(
        ['c1','c1','c3','c4'],
        ['c1','c3','c2','c4']
      )).toEqual(
        ['wrongSpot','rightSpot','rightSpot','wrongColor']
      );
    });
  });

  describe('duplicates in guess', () => {
    it('only shows once in clue', () => {
      expect(evaluateGuess(
        ['c1','c2','c3','c4'],
        ['c1','c1','c2','c4']
      )).toEqual(
        ['wrongSpot','rightSpot','rightSpot','wrongColor']
      );
    });    

    expect(evaluateGuess(
      ['c1','c2','c3','c4'],
      ['c1','c3','c3','c4']
    )).toEqual(
      ['rightSpot','rightSpot','rightSpot','wrongColor']
    );
  });
});
