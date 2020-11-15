import _ from 'lodash'
import {evaluateGuess, isWinner, newCode} from './gameCalculations';
describe('newCode', () => {
  it('returns the correct code size', () => {
    let code = newCode(1,1);
    expect(code).toEqual([0]);
    expect(newCode(10, 2)).toHaveLength(2);
    expect(newCode(10,10)).toHaveLength(10);
  });

  it('does not duplicate values by default', () => {
    expect(_.uniq(newCode(4,4))).toHaveLength(4);
    expect(_.uniq(newCode(6,4))).toHaveLength(4);
  });
  it('does will duplicate values if length > valueCount', () => {
    expect(_.uniq(newCode(3,4))).toHaveLength(3);
    expect(_.uniq(newCode(6,4))).toHaveLength(4);
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
      [1,1]
    );
  });
  it('shows wrong spot', () => {
    expect(evaluateGuess(
      [5,6,3,4],
      [1,2,4,3]
    )).toEqual(
      [0,0]
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
      )).toEqual(
        [0,1,1]
      );
    });
  });

  describe('duplicates in guess', () => {
    it('only shows once in clue', () => {
      expect(evaluateGuess(
        [1,2,3,4],
        [1,1,2,4]
      )).toEqual(
        [0,1,1]
      );
    });    

    expect(evaluateGuess(
      [1,2,3,4],
      [1,3,3,4]
    )).toEqual(
      [1,1,1]
    );
  });
});