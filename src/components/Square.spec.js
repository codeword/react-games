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
      let mergedProps = Object.assign({
        onClick,
        preview: 'preview',
        className: 'passeIn'
      }, props)
      cleanup();
      act(() => {render(<Square {...mergedProps}/>);});
      button = screen.getByRole('button');
    }
  };
  let teardown = () => {
    cleanup();
    onClick=undefined;
    button=undefined;
  }
  describe('When Square has content', () => {
    beforeEach(setup({value: "Foo"}));
    afterEach(teardown);
    it('renders the passed in content', () => {
      expect(button).toHaveTextContent('Foo');
    });
    it('disables the square', () => {
      expect(button).toBeDisabled();
      act(() => userEvent.click(button));
      expect(onClick).not.toHaveBeenCalled();
    });
    describe('Hover states', () => {
      it('is not affected by hover', () => {
        act(() => userEvent.hover(button));
        expect(button).toHaveTextContent("Foo");
        act(() => userEvent.unhover(button));
        expect(button).toHaveTextContent("Foo");
      });
    });
  });

  describe('When Square has no content', () => {
    beforeEach(setup({value: ""}));
    afterEach(teardown);
    it('handles clicks correctly', () => {
      act(() => userEvent.click(button));
      expect(onClick).toHaveBeenCalled();
    });
    describe('Hover states', () => {
      it('shows a preview only when hovered', () => {
        expect(button).toHaveTextContent("");
        act(() => userEvent.hover(button));
        expect(button).toHaveTextContent("preview");
        act(() => userEvent.unhover(button));
        expect(button).toHaveTextContent("");
      });
    });
  });
  it('shows winning squares', () => {
    setup()();
    expect(button).not.toHaveClass('winner');

    setup({isWinner: false})();

    expect(button).not.toHaveClass('winner');

    setup({isWinner: true})();

    expect(button).toHaveClass('winner');
  });
});