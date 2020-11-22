import _ from 'lodash';

// export type Peg = 0|1|2|3|4|5|6|7|8|9 
export enum FillPeg {
  blank = "blank",
  empty = "empty"
}
export enum ColorPeg {
  c0,
  c1,
  c2,
  c3,
  c4,
  c5,
  c6,
  c7,
  c8,
  c9
}
export enum CluePeg {
  wrongSpot,
  rightSpot,
  wrongColor
}


export type FillColor = keyof typeof FillPeg;
export type ClueColor = keyof typeof CluePeg;
export type CodeColor = keyof typeof ColorPeg;
export type EmptyColor = Extract<FillColor, 'empty'>;
export type BlankColor = Extract<FillColor, 'blank'>;
export type PlayableColor = CodeColor | BlankColor;
export type AnyColor = PlayableColor | FillColor | ClueColor;


export type GameType = {
  code: CodeColor[],
  colors: ColorPeg, 
  slots: number, 
  allowDupes: boolean
}
export type MoveType = {
  guess: PlayableColor[] | EmptyColor[],
  clue: ClueColor[]
}

// type CreateGame = (  ) => Game
export const createGame = (colors: ColorPeg, slots: number, allowDupes?: boolean) : GameType => {
  let code: CodeColor[] = [];
  let values = palette(colors) as CodeColor[];
  allowDupes = allowDupes || colors < slots;
  while(code.length < slots) {
    let nextIdx = _.random(values.length-1);
    code.push(values[nextIdx]);
    if(!allowDupes) values.splice(nextIdx, 1);
  }
  return { code, colors, slots, allowDupes };
}


export const isWinner = (code: CodeColor[], clue:ClueColor[]): boolean => {
  return (code.length === clue.length && _.every(clue, peg => CluePeg[peg] === CluePeg.rightSpot));
}

type ClearablePeg = PlayableColor|-1;
export const evaluateGuess:(code:CodeColor[], guess:PlayableColor[]) => ClueColor[] = (...args) => {
  let [rightSpot, wrongSpot, wrongColor] = [
    CluePeg.rightSpot,
    CluePeg.wrongSpot,
    CluePeg.wrongColor
  ].map(x => CluePeg[x]) as ClueColor[];

  let clue: ClueColor[] = [];
  let code = args[0].slice() as ClearablePeg[];
  let guess = args[1].slice() as ClearablePeg[];
  for (let i = code.length-1; i >= 0; i--) {
    if(code[i] !== -1 && code[i] === guess[i]) {
      clue.push(rightSpot);
      code[i] = -1;
      guess[i] = -1;
    }
  }
  return _.reduce(guess, (acc, peg, idx) => {
    if(peg === -1) return acc;
    let codeIdx = _.indexOf(code, peg);
    if(codeIdx >= 0) {
      code[codeIdx] = -1;
      acc.unshift(wrongSpot);
    } else {
      acc.push(wrongColor);
    }
    return acc;
  }, clue);
}

export const palette = (numColors: number, includeBlank = false): PlayableColor[] | CodeColor[] => {
  let colors = _.range(numColors).map((color: number) => ColorPeg[color]) as PlayableColor[];
  if(includeBlank) {
    colors.push(FillPeg.blank);
  }
  return colors;
}
