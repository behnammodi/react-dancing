/* eslint-disable no-undef */
import '@babel/polyfill';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Dancer, useDancer } from '../src';
import { create } from 'react-test-renderer';

const delay = (timeout) => new Promise((done) => setTimeout(done, timeout));

test('Snapshot a simple <Dancer />', () => {
  function App() {
    const [ref] = useDancer();
    return <Dancer ref={ref}></Dancer>;
  }

  const component = create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshot a <Dancer /> with some props', () => {
  function App() {
    const [ref] = useDancer();
    return (
      <Dancer ref={ref} className="a" id="b" style={{ margin: 100 }}></Dancer>
    );
  }

  const component = create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Check style a <Dancer />', async () => {
  function App() {
    const [ref, play] = useDancer();

    useEffect(() => {
      play({ transform: 'translateX(100px)' });
    }, []);

    return (
      <Dancer ref={ref} className="a" id="b" style={{ margin: 100 }}></Dancer>
    );
  }
  const root = document.createElement('div');

  ReactDOM.render(<App />, root);

  const dancer = root.querySelector('div');

  /**
   * defualt style
   */
  expect(dancer.style.transitionDuration).toBe('0.2s');

  await delay(10);

  /**
   * style after run play
   */
  expect(dancer.style.transform).toBe('translateX(100px)');
});
