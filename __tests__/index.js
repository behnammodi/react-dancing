/* eslint-disable no-undef */
import '@babel/polyfill';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDancer } from '../src';
import { create } from 'react-test-renderer';

const delay = (timeout) => new Promise((done) => setTimeout(done, timeout));

test('Snapshot a simple useDancer', () => {
  function App() {
    const [ref] = useDancer();
    return <div ref={ref}></div>;
  }

  const component = create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Snapshot a useDancer with some props', () => {
  function App() {
    const [ref] = useDancer();
    return <div ref={ref} className="a" id="b" style={{ margin: 100 }}></div>;
  }

  const component = create(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Check style a useDancer', async () => {
  function App() {
    const [ref, start] = useDancer({
      interpolate: {
        transform: (x) => `translateX(${x * 100}px)`,
      },
    });

    useEffect(() => {
      start(1);
    }, []);

    return <div ref={ref} className="a" id="b" style={{ margin: 100 }}></div>;
  }
  const root = document.createElement('div');

  ReactDOM.render(<App />, root);

  const dancer = root.querySelector('div');

  await delay(300);

  /**
   * style after run play
   */
  expect(dancer.style.transform).toBe('translateX(100px)');
});

test('Check exposed item when componet not existed', () => {
  let spy = null;

  function App() {
    spy = useDancer();
    return null;
  }
  const root = document.createElement('div');

  ReactDOM.render(<App />, root);

  expect(spy[0]).toBeInstanceOf(Function);
  expect(spy[1]).toBeInstanceOf(Function);
  expect(spy[2]).toBeInstanceOf(Function);
});

test('Check exposed item when componet existed', () => {
  let spy = null;

  function App() {
    spy = useDancer();

    return <div ref={spy[0]} />;
  }
  const root = document.createElement('div');

  ReactDOM.render(<App />, root);

  expect(spy[0]).toBeInstanceOf(Function);
  expect(spy[1]).toBeInstanceOf(Function);
  expect(spy[2]).toBeInstanceOf(Function);
});
