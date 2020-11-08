import React from "react";
import '@testing-library/jest-dom';
import {cleanup, render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import Game from './Game'

describe('Game', () => {
  beforeEach(() => {
    act(() => {render(<Game/>);});
  });
  afterEach(() => {
    cleanup();
  });

  it('renders aboard', () => {
    expect(screen.queryByText("Next player: X")).toBeInTheDocument();
    let squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(9);
  });

  describe('When the players have made moves', () => {
    let square = (row, col) => screen.getByTestId(`square-${row}-${col}`);
    beforeEach(() => {
      act(() => userEvent.click(square(0,0)));
      act(() => userEvent.click(square(0,1)));
      act(() => userEvent.click(square(1,1)));
    });
    it('shows player moves', () => {
      expect(screen.queryByText("Next player: O")).toBeInTheDocument();
      expect(within(screen.queryByTestId('moves')).queryAllByRole('button')).toHaveLength(3);
      expect(screen.queryByTestId('game-board')).toHaveTextContent("XOX")
      let firstMove = screen.queryByTestId('move-0');
      expect(firstMove).toHaveTextContent("X played (0, 0) :Start Over");
      expect(within(firstMove).queryByRole('button')).toHaveTextContent(/^Start Over$/);
      let secondMove = screen.queryByTestId('move-1');
      expect(secondMove).toHaveTextContent("O played (0, 1) :Undo");
      expect(within(secondMove).queryByRole('button')).toHaveTextContent(/^Undo$/);
    });

    describe('Undoing a move', () => {
      beforeEach(() => {
        let lastMove = screen.queryByTestId('move-2');
        expect(lastMove).toHaveTextContent("X played (1, 1) :Undo");
        let sq = square(1,1);
        expect(sq).toHaveTextContent("X");
        expect(sq).toBeDisabled();
        act(() => userEvent.click(within(lastMove).queryByRole('button')));
      });
      it('Undoes the Move', () => {
        expect(within(screen.queryByTestId('moves')).queryAllByRole('button')).toHaveLength(2);
        expect(screen.queryByText("Next player: X")).toBeInTheDocument();
        let sq = square(1,1);
        expect(sq).toHaveTextContent("");
        expect(sq).toBeEnabled();
      });
    });
    describe('Starting Over', () => {
      beforeEach(() => {
        let firstMove = screen.queryByTestId('move-0');
        expect(firstMove).toHaveTextContent("X played (0, 0) :Start Over");
        let sq = square(0,0);
        expect(sq).toHaveTextContent("X");
        expect(sq).toBeDisabled();
        act(() => userEvent.click(within(firstMove).queryByRole('button')));
      });
      it('Undoes the Move', () => {
        expect(within(screen.queryByTestId('moves')).queryAllByRole('button')).toHaveLength(0);
        expect(screen.queryByTestId('game-board')).toHaveTextContent("")
        expect(screen.queryByText("Next player: X")).toBeInTheDocument();
      });
    });
    describe('Winning', () => {
      beforeEach(() => {
        act(() => userEvent.click(square(0,2)));
        act(() => userEvent.click(square(2,2)));
      });
      it('Shows who won', () => {
        expect(screen.queryByText("Winner: X")).toBeInTheDocument();
      });
      it('highlights the winning moves', () => {
        expect(square(0,0)).toHaveClass("winner");
        expect(square(0,1)).not.toHaveClass("winner");
        expect(square(0,2)).not.toHaveClass("winner");
        expect(square(1,0)).not.toHaveClass("winner");
        expect(square(1,1)).toHaveClass("winner");
        expect(square(1,2)).not.toHaveClass("winner");
        expect(square(2,0)).not.toHaveClass("winner");
        expect(square(2,1)).not.toHaveClass("winner");
        expect(square(2,2)).toHaveClass("winner");
      });
    });
    describe('Tie Game', () => {
      beforeEach(() => {
        act(() => userEvent.click(square(2,2)));
        act(() => userEvent.click(square(0,2)));
        act(() => userEvent.click(square(1,2)));
        act(() => userEvent.click(square(1,0)));
        act(() => userEvent.click(square(2,0)));
        act(() => userEvent.click(square(2,1)));
        expect(within(screen.queryByTestId('moves')).queryAllByRole('button')).toHaveLength(9);
      });
      it('Shows the tie', () => {
        expect(screen.queryByText("Next Player:")).not.toBeInTheDocument();
        expect(screen.queryByTestId("game-stats")).toHaveTextContent("Cats Game!");
      });

      it('Does not highlight any squares', () => {
        for(let button of within(screen.queryByTestId('game-board')).queryAllByRole('button')) {
          expect(button).not.toHaveClass("winner")
        }
      });
    });
  });
});