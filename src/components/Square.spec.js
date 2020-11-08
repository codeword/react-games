import React from "react";
import '@testing-library/jest-dom';
import {cleanup, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import Square from './Square';

describe('Square', () => {
  let onClick, button;
  let setup = (props) => {
    return () => {
      onClick = jest.fn();
      props.onClick = onClick;
      cleanup();
      act(() => {render(<Square {...props}/>);});
      button = screen.getByRole('button');
    }
  };
  beforeEach(setup({value: "Foo"}))
  afterEach(cleanup);
  it('renders the passed in content', () => {
    expect(button).toHaveTextContent('Foo');
  });
  it('shows winning squares', () => {
    expect(button).not.toHaveClass('winner');

    setup({isWinner: false})();

    expect(button).not.toHaveClass('winner');

    setup({isWinner: true})();

    expect(button).toHaveClass('winner');
  });

  it('handles clicks correctly', () => {
    act(() => {
      userEvent.click(button);
    });
    expect(onClick).toHaveBeenCalled();
  });
});