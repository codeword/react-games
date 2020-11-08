import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import Square from './Square';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('Square', () => {
  let onClick;

  beforeEach(() => {
    onClick = jest.fn();
    act(() => {
      render(<Square value="Foo" onClick={onClick}/>, container);
    });
  });
  it('renders the passed in content', () => {
    expect(container.querySelector('.square').textContent).toEqual('Foo');
  });

  it('shows winning squares', () => {
    expect(container.querySelector('.square')).toBeDefined();
    expect(container.querySelector('.square.winner')).toBeNull();

    act(() => {
      render(<Square value="Foo" isWinner={false}/>, container);
    });

    expect(container.querySelector('.square')).toBeDefined();
    expect(container.querySelector('.square.winner')).toBeNull();

    act(() => {
      render(<Square value="Foo" isWinner={true}/>, container);
    });
    expect(container.querySelector('.square.winner')).toBeDefined();
  });

  it('handles clicks correctly', () => {
    act(() => {
      userEvent.click(container.querySelector("button"))
    });
    expect(onClick).toHaveBeenCalled();
  });
});