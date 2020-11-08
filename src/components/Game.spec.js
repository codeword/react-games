import React from "react";
import '@testing-library/jest-dom';
import {cleanup, render, screen} from '@testing-library/react'
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
    expect(screen.getByText("Next player: X")).toBeInTheDocument();
    let squares = screen.getAllByRole('button');
    expect(squares.length).toEqual(9);
  });
});