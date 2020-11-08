import React from "react";
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import Board from './Board';

describe('Block', () => {
  let squares, isWinner, onClick;
  beforeEach(() => {
    squares = [['a', 'b', 'c'], ['d','e','f']];
    isWinner = (a, b) => a===1;
    onClick = jest.fn();
    render(<Board {...{squares, isWinner, onClick}}/>);
  });

  it('renders the board', () => {
    expect(screen.queryAllByTestId(/square-\d-\d/).length).toEqual(6);
    expect(screen.queryByTestId(/square-1-1/)).toHaveTextContent('e');
  });

  it('passes a click handler to the squares', () => {
    let square = screen.getByTestId('square-1-2');
    act(() => userEvent.click(square));
    expect(onClick).toHaveBeenCalledWith(1,2);
  });

  it('passes a way for square to indicate winner', () => {
    expect(screen.queryByTestId(/square-0-0/)).not.toHaveClass("winner");
    expect(screen.queryByTestId(/square-1-0/)).toHaveClass("winner");
  });
})
