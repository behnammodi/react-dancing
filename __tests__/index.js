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

  await delay(20);

  /**
   * style after run play
   */
  expect(dancer.style.transform).toBe('translateX(100px)');
});

test('Check config a <Dancer />', async () => {
  function App() {
    const [ref] = useDancer({
      defaultStyle: {
        color: 'red',
      },
      duration: '1s',
      timingFunction: 'linear',
      delay: '2s',
    });

    return <Dancer ref={ref} />;
  }
  const root = document.createElement('div');

  ReactDOM.render(<App />, root);

  const dancer = root.querySelector('div');

  /**
   * defualt style
   */
  expect(dancer.style.color).toBe('red');
  expect(dancer.style.transitionDuration).toBe('1s');
  expect(dancer.style.transitionTimingFunction).toBe('linear');
  expect(dancer.style.transitionDelay).toBe('2s');
});

test('Check exposed item when componet not existed', () => {
  let spy = null;

  function App() {
    spy = useDancer();
    return null;
  }
  const root = document.createElement('div');

  ReactDOM.render(<App />, root);

  expect(spy[0]).toHaveProperty('current');
  expect(spy[0].current).toBe(undefined);
  expect(spy[1]).toBeInstanceOf(Function);
});

test('Check exposed item when componet existed', () => {
  let spy = null;

  function App() {
    spy = useDancer();

    return <Dancer ref={spy[0]} />;
  }
  const root = document.createElement('div');

  ReactDOM.render(<App />, root);

  expect(spy[0]).toHaveProperty('current');
  expect(spy[0].current).toBeInstanceOf(HTMLElement);
  expect(spy[1]).toBeInstanceOf(Function);
});
