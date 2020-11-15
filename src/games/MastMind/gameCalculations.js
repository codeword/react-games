import _ from 'lodash';


export function newCode(colors, slots, allowDupes) {
  let value = [];
  let values = _.range(colors);
  allowDupes = allowDupes || colors < slots;
  while(value.length < slots) {
    let nextIdx = _.random(values.length-1);
    value.push(values[nextIdx]);
    if(!allowDupes) values.splice(nextIdx, 1);
  }
  return { value, colors, slots, allowDupes };
}
export function isWinner(code, clue) {
  return (code.length == clue.length && _.every(clue, x => x === 1));
}

export function evaluateGuess(code, guess) {
  let clue = [];
  code = code.slice();
  guess = guess.slice();
  for (let i = code.length-1; i >= 0; i--) {
    if(code[i] != -1 && code[i] == guess[i]) {
      clue.push(1);
      code[i] = -1;
      guess[i] = -1;
    }
  }
  let found = {};
  clue = _.reduce(guess, (clue, peg, idx) => {
    if(peg === -1) return clue;
    let codeIdx = _.indexOf(code, peg);
    if(codeIdx >= 0) {
      code[codeIdx] = -1;
      guess[idx] = -1;
      clue.unshift(0);
    }
    return clue;
  }, clue);
  return clue;
}